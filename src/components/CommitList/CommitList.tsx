interface CommitListProps {
  commits?: string[];
}

const CommitList = ({ commits }: CommitListProps) => {
  console.log(commits);
  return <div>CommitList</div>;
};

export default CommitList;
