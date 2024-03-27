import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_index/")({
  component: IndexPresenter,
});

export function IndexPresenter() {
  return <div>Hello /_index/!</div>;
}
