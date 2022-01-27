import React from 'react';
import ReactDOM from 'react-dom';
import {
  cleanup,
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react';
import { createBrowserHistory } from 'history';
import ChatsList from './ChatsList';

describe('ChatsList', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.enableMocks();
  });
  afterEach(() => {
    fetchMock.mockClear();
    cleanup();
  });

  it('renders fetched chats data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    {
      const history = createBrowserHistory();
      const { container } = render(<ChatsList history={history} />);

      await waitFor(() => container);

      expect(screen.queryByTestId('name')).toHaveTextContent('Foo Bar');
      expect(screen.queryByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(screen.queryByTestId('content')).toHaveTextContent('Hello');
      expect(screen.queryByTestId('date')).toHaveTextContent('07:00');
    }
  });

  it('should navigate to the target chat room on chat item click', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    const history = createBrowserHistory();

    {
      const { container } = render(<ChatsList history={history} />);

      await waitFor(() => screen.findByTestId('chat'));

      fireEvent.click(screen.getByTestId('chat'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual('/chats/1')
      );
    }
  });
});
