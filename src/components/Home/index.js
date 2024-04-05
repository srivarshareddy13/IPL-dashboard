// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
const apiUrl = 'https://apis.ccbp.in/ipl'
class Home extends Component {
  state = {
    iplTeams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIplTeams()
  }
  getIplTeams = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()

    const formattedData = data.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({iplTeams: formattedData, isLoading: false})
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1>IPL Dashboard</h1>
        <div>
          {isLoading ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} />
            </div>
          ) : (
            <ul>
              {iplTeams.map(each => (
                <TeamCard key={each.id} details={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default Home
