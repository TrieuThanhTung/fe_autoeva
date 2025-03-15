import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <h1 className="text-3xl font-intalic underline">Home</h1>
      <Share />
      <Posts />
    </div>
  )
}

export default Home