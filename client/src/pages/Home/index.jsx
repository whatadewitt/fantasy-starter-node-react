function Home() {
  return (
    <a href={import.meta.env.VITE_AUTH_URL} title="Login with Yahoo!">
      Login with Yahoo!
    </a>
  );
}

export default Home;
