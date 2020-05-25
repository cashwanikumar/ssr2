import React from "react";
import styled from "styled-components";

import {
    getNews,
    updatePresistData,
    presistData,
} from "../../service/newsService";
import PlotChart from "./PlotChart";
import NewsList from "./NewsList";

const DivWrapper = styled.div`
  border-bottom: 2px solid #f46427;
  padding-bottom: 10px;
`;

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            totalPage: 0,
            page: 0,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            // pre render data if found from server side
            if (window.__ROUTE_DATA__) {
                let newNews = window.__ROUTE_DATA__.hits;
                if (window.__ROUTE_DATA__.hits) {
                    newNews = updatePresistData(window.__ROUTE_DATA__.hits);
                }
                this.setState({
                    news: newNews,
                    totalPage: window.__ROUTE_DATA__.nbPages || 0,
                    page: window.__ROUTE_DATA__.page || 0,
                });
                delete window.__ROUTE_DATA__;
            } else {
                // fetch news if no data found from server side
                getNews(0).then((data) => {
                    this.setState({
                        news: data.hits || [],
                        totalPage: data.nbPages || 0,
                        page: data.page || 0,
                    });
                });
            }
        }, 0);
    }

  goToPage = (page) => {
      const { history } = this.props;
      if (page === 0) {
          history.push(`/news`);
      }
      history.push(`/news?page=${page}`);
      getNews(page).then((data) => {
          this.setState({
              news: data.hits || [],
              totalPage: data.nbPages || 0,
              page: data.page || 0,
          });
      });
  };

  hideElm = (id) => {
      presistData(id, "hide").then(() => {
          const { news } = this.state;
          this.setState({
              news: news.filter((data) => data.objectID !== id),
          });
      });
  };

  upVoteElm = (id) => {
      presistData(id, "upVote").then(() => {
          const { news } = this.state;
          this.setState({
              news: news.map((data) => {
                  if (data.objectID === id) {
                      return {
                          ...data,
                          points: data.points + 1,
                      };
                  }
                  return { ...data };
              }),
          });
      });
  };

  render() {
      const { news, page } = this.state;
      return news && news instanceof Array && news.length > 0 ? (
          <div>
              <DivWrapper>
                  <NewsList
                      upVoteElm={this.upVoteElm}
                      hideElm={this.hideElm}
                      goToPage={this.goToPage}
                      news={news}
                      page={page}
                  />
              </DivWrapper>
              <DivWrapper
                  style={{
                      marginTop: "10px",
                  }}
              >
                  <PlotChart news={news} />
              </DivWrapper>
          </div>
      ) : (
          <div>No News Found</div>
      );
  }
}

export default News;
