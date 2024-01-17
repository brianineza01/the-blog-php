import { FileRoute } from "@tanstack/react-router";
import Posts from "../components/Posts";

export const Route = new FileRoute('/').createRoute({
    component: Home,
});

function Home() {
    return <Posts />;
}
