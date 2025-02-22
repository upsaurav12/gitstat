import AuthButton from "./src/component/AuthButton";
import RepoList from "./src/component/RepoList";

export default function Home() {
  return (
    <main className="ml-2">
      < AuthButton />
      <RepoList />
    </main>
  );
}
