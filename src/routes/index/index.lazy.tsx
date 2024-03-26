import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/index/')({
  component: () => <div>Hello /index/!</div>
})