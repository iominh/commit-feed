import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IndexPage() {
  const ref = useRef(null);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    console.log("repo page", location);
    document.title = `Commit Feed`;
  }, [location]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      const element = ref.current as HTMLDivElement;
      const userInput = element.querySelector('.userInput') as HTMLInputElement
      const repoInput = element.querySelector('.repoInput') as HTMLInputElement;
      navigate(`${userInput.value}/${repoInput.value}`);
    }
  };

  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit}>
        <input className="userInput"></input>
        <input className="repoInput"></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default IndexPage;
