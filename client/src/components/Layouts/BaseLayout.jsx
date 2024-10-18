import Footer from "../UI/Footer";
import Header from "../UI/Header";

export default function BaseLayout({ children, hideFooter = false }) {
  return (
    <>
      <Header />
      <div className="main-content pt-12 md:pt-20 z-40">{children}</div>
      {/* {createPortal(<Cart />, document.body)} */}
      {!hideFooter && <Footer />}
    </>
  );
}
