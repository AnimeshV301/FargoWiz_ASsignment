import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const URL = "https://jsonplaceholder.typicode.com/posts";

function useAPi(url) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(url);
    setData(response.data);
  };

  const removeData = (id) => {
    axios.delete(`${url}/${id}`).then(() => {
      const del = data.filter((item) => id !== item.id);
      setData(del);
    });
  };

  return { data, removeData };
}

const Deletetable = () => {
  const { data, removeData } = useAPi(URL);

  const renderHeader = () => {
    let headerElement = ["id", "Title", "Body", ""];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      data &&
      data.map(({ id, title, body }) => {
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{body}</td>

            <td>
              <Button variant="warning" onClick={() => removeData(id)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </>
  );
};

export default Deletetable;
