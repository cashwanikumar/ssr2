import React from "react";
import { Table, Button } from "reactstrap";

import EachNews from "./EachNews";

class NewsList extends React.Component {
    render() {
        const { news, page, upVoteElm, hideElm, goToPage } = this.props;
        return news && news instanceof Array && news.length > 0 ? (
            <>
                <Table responsive striped>
                    <thead
                        style={{
                            background: "#f46427",
                            color: "#fff",
                        }}
                    >
                        <tr>
                            <th>Comments</th>
                            <th>Vote Count</th>
                            <th>UpVote</th>
                            <th>News Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((eachNews) => (
                            <EachNews
                                key={eachNews.objectID}
                                eachNews={eachNews}
                                upVoteElm={upVoteElm}
                                hideElm={hideElm}
                            />
                        ))}
                    </tbody>
                </Table>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {page > 0 ? (
                        <Button
                            onClick={() => goToPage(page - 1)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#f46427",
                                borderRight: "3px solid #f46427",
                                borderRadius: 0,
                            }}
                        >
                Previous
                        </Button>
                    ) : null}
                    <Button
                        onClick={() => goToPage(page + 1)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#f46427",
                        }}
                    >
              Next
                    </Button>
                </div>
            </>
        ) : (
            <div>No News Found</div>
        );
    }
}

export default NewsList;
