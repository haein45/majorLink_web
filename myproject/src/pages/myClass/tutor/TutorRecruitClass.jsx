// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { HeaderComponent } from "../../../components/common/header/HeaderComponent";
import font from "../../../styles/font";
import color from "../../../styles/color";
import Sidebar from "../Sidebar";
import ThumbImg from "../../../assets/common/thumbnail_myclass_172x95.png";
import TutorRecruitingSelectMenu from "./TutorRecruitingSelectMenu";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 100px 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Title = styled.p`
  ${() => font.title};
  margin: 20px 0;
`;

const ListContainer = styled.div`
  margin-top: 30px;
`;

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  th{
    border-top: 7px solid ${() => color.primary_normal};
    border-bottom: 1px solid ${() => color.grayscale_80};
    ${() => font.semibold_20};
    padding: 20px;
  }
  td {
    border-bottom: 1px solid;
    ${() => font.regular_18};
    padding: 20px;
  }
  th:first-child, td:first-child {
    border-left: none;
  }
  img {
    width: 100px;
    padding: none;
  }
  button {
    border-radius: 20px;
    border: 2px solid ${() => color.primary_normal};
    ${() => font.regular_18};
    color: ${() => color.primary_normal};
    background-color: transparent;
    padding: 10px;
    width: 60%
  }
`;

function TutorRecruitClass() {

  const headers = [
    {
      text: '번호',
      value: 'num'
    },
    {
      text: '썸네일',
      value: 'img'
    },
    {
      text: '클래스 명',
      value: 'class'
    },
    {
      text: '모집된 인원',
      value: 'count'
    },
    {
      text: '수업 상태',
      value: 'state'
    },
  ];

  // const items = [
  //   {
  //     id: '1',
  //     num: '1',
  //     img: 'img',
  //     class: '백엔드 웹 개발 기초',
  //     count: '1',
  //     state: '수업 시작하기'
  //   },
  // ];

  // const headerKey = headers.map((header) => header.value);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(`https://dev.majorlink.store/lecture/list`);
        setReviews(response.data.lectureList);
        console.log(response.data.lectureList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClass();
  }, []);

  return(
    <div>
      <HeaderComponent />
      <Wrapper>
      <Sidebar />
        <Container>
          <Title>모집 중인 클래스</Title>
          <TutorRecruitingSelectMenu />
          <ListContainer>
              <Table>
                <colgroup>
                  <col width="10%" />
                  <col width="20%" />
                  <col width="30%" />
                  <col width="15%" />
                  <col width="25%" />
                </colgroup>
                <thead>
                  <tr>
                    {headers.map((header) => 
                    <th key={header.text}>
                      {header.text}
                    </th>)}
                  </tr>
                </thead>

                <tbody>
                  {reviews.map((item) => (
                    <tr key={item.id}>
                      <td>{item.lectureId}</td>
                      <td><img src={ThumbImg} alt="Thumbnail" /></td>
                      <td>{item.name}</td>
                      <td>{item.cnum}</td>
                      <td>{item.level}</td>
                    </tr>
                  ))}
                </tbody>


                {/* <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      {headerKey.map((key) => {
                        let content;

                        if (key === 'state') {
                          content = <Link to='/myclass/movetoonlineclass'><button type="button">{item[key]}</button></Link>;
                        } else if (key === 'img') {
                          content = <img src={ThumbImg} alt="썸네일" />;
                        } else if (key === 'class') {
                          content = (
                            <Link to={`/myclass-tutor/recruiting/${item.id}`}>
                              {item[key]}
                            </Link>
                          )
                        } else {
                          content = item[key];
                        }
                        return <td key={key + item.id}>{content}</td>;
                      })}
                    </tr>
                  ))}
                </tbody> */}
              </Table>
          </ListContainer>
        </Container>
      </Wrapper>
    </div>
  );
}

export default TutorRecruitClass;