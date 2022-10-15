import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SignIn } from './SignIn'
import { rest } from 'msw'

export default {
  title: 'Pages/SignIn',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(ctx.json({
            message: 'Login feito'
          }))
        })
      ],
    },
  }
} as Meta

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'r.matos96@gmail.com')
    userEvent.type(canvas.getByPlaceholderText('******'), '123')

    userEvent.click(canvas.getByRole('button'))

    await waitFor(() => {
      return expect(canvas.getByText('Login realizado com sucesso!')).toBeInTheDocument()
    })

  }
}
