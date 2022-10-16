const getUser = (userQuery: string): Promise<any> => {
  return fetch(
    `https://api.github.com/search/users?` +
      new URLSearchParams({
        q: userQuery,
      })
  )
    .then((res) => res.json())
    .then((res) => {
      const newUsers = res.items.map((item: any, id: number) => {
        return {
          label: item.login,
          id,
        };
      });
      return newUsers;
    });
};

export default getUser;
