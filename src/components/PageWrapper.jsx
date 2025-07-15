import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const PageWrapper = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default PageWrapper;
