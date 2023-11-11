import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";

const PostList = () => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {<PostListItem />}
      </tbody>
    </Table>
  )
}

export default PostList