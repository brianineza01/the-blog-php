import { FileRoute, lazyFn, lazyRouteComponent } from "@tanstack/react-router"

import { Route as rootRoute } from "./routes/__root"
import { Route as IndexImport } from "./routes/index"
import { Route as PostsCreateImport } from "./routes/posts/create"
import { Route as PostsSlugImport } from "./routes/posts/$slug"
import { Route as PostsIndexImport } from "./routes/posts/index"

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const PostsCreateRoute = PostsCreateImport.update({
  path: "/posts/create",
  getParentRoute: () => rootRoute,
} as any)

const PostsSlugRoute = PostsSlugImport.update({
  path: "/posts/$slug",
  getParentRoute: () => rootRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  path: "/posts/",
  getParentRoute: () => rootRoute,
} as any)

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/posts/": {
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
    "/posts/$slug": {
      preLoaderRoute: typeof PostsSlugImport
      parentRoute: typeof rootRoute
    }
    "/posts/create": {
      preLoaderRoute: typeof PostsCreateImport
      parentRoute: typeof rootRoute
    }
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  PostsIndexRoute,
  PostsSlugRoute,
  PostsCreateRoute,
])
