// import BlogList from '../components/Blog/BlogList';
import BlogList from "@/components/Blog/BlogList";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <h1>NextPost - Blog App made by <a style={{color: 'blue'}} target="_blank" href="https://www.github.com/tauhazmat">@tauhazmat</a></h1>
      <BlogList />
    </div>
  );
}
