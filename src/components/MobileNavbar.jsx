import { useRef, useState } from "react";

const MobileNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigationDiv = useRef(null);

  const amIHidden = flag ? "flex" : "hidden";

  const handleClick = () => {
    setToggle((prev) => !prev);

    const mobileNav = navigationDiv.current;
    if (!flag) {
      mobileNav.style.transform = "translateX(0)";

      setFlag((prev) => !prev);
    } else {
      mobileNav.style.transform = "translateX(26rem)";

      setFlag((prev) => !prev);
    }
  };

  return (
    <>
      <div id="main">
        <div
          id="hamburger-menu"
          onClick={handleClick}
          className={toggle ? "toggle" : undefined}
        >
          <li className="top-bar" />
          <li className="middle-bar" />
          <li className="bottom-bar" />
        </div>
      </div>
      <div id="mobile-nav" ref={navigationDiv} className={amIHidden}>
        <div id="navigation-div">
          <div className="text-center ul">
            <ul>
              <li className="hover:cursor-pointer">
                <a href="/">Home</a>
              </li>
              <li className="hover:cursor-pointer">
                <a href="/products">Products</a>
              </li>
              <li className="hover:cursor-pointer">
                <a href="/admin">Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
