import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import styled from "styled-components";

import TriangleIcon from "../../assets/triangle.png";
import { getUrl } from "../../service/helper";

TimeAgo.addLocale(en);

const LightWrapper = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  color: #828282;
`;

const ClickHoverBtn = styled.span`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const SubContent = styled.span`
  font-size: 0.8em;
`;

const EachNews = ({ eachNews, hideElm, upVoteElm }) => {
    const timeAgo = new TimeAgo("en-US");
    timeAgo.format(new Date());
    return (
        <tr>
            <td>{eachNews.num_comments || 0}</td>
            <td>{eachNews.points || 0}</td>
            <td
                style={{
                    textAlign: "center",
                }}
            >
                <ClickHoverBtn onClick={() => upVoteElm(eachNews.objectID)}>
                    <img src={TriangleIcon} alt="upVote" height={18} />
                </ClickHoverBtn>
            </td>
            <td>
                {eachNews.title}
                <SubContent>
                    <LightWrapper>
            (
                        <a
                            href={eachNews.url}
                            style={{
                                color: "inherit",
                            }}
                        >
                            {getUrl(eachNews.url)}
                        </a>
            ) by
                    </LightWrapper>
                    {eachNews.author}
                    <LightWrapper>
                        {timeAgo.format(Date.now() - eachNews.created_at_i)}
                    </LightWrapper>
          [{" "}
                    <ClickHoverBtn onClick={() => hideElm(eachNews.objectID)}>
            Hide
                    </ClickHoverBtn>{" "}
          ]
                </SubContent>
            </td>
        </tr>
    );
};

export default EachNews;

// comment
// vote count
//upVote
// News Detai;s
// by
