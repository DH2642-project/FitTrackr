import { createLazyFileRoute } from "@tanstack/react-router";
import { GoalsPresenter, ChildrenProps } from "../../sub-presenters/GoalsPresenter";
import { GoalsView } from "../../views/GoalsView";

export const Route = createLazyFileRoute("/goals/")({
  component: () => (
    <GoalsPresenter>
      {(props: ChildrenProps) => <GoalsView {...props} />}
    </GoalsPresenter>
  ),
});
