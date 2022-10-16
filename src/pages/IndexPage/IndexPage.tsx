function IndexPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', e);
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default IndexPage;
