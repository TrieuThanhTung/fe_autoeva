import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home_v1 = () => {
  return (
    <div className="home">
      <Share />
      <Posts />
    </div>
  )
}

export default Home_v1