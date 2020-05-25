import NotFound from "./components/NotFound";
import News from "./components/News/index";

import { getNews } from "./service/newsService";

const Routes = [
    {
        path: "/news",
        component: News,
        loadData: (page) => getNews(page || 0),
    },
    {
        component: NotFound,
    },
];

export default Routes;
