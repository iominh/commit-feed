function IndexPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  const handleUserChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
  };

  const handleRepoChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleUserChange}></input>
        <input onChange={handleRepoChange}></input>
      </form>
    </div>
  );
}

export default IndexPage;
