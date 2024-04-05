// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamMatch: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(each => 
        this.getFormattedData(each),
      ),
    }

    this.setState({teamMatch: formattedData, isLoading: false})
  }

  renderRecentMatchList = () => {
        const {teamMatch} = this.state
        const {recentMatches} = teamMatch

        return (
          <ul>
            {recentMatches.map(each => (
              <MatchCard matchData={each} key={each.id} />
            ))}
          </ul>
        )
  }
  renderMatchList = () => {
    const {teamMatch} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatch
    return (
      <div>
        <img src={teamBannerUrl} alt="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {

    return <div>{isLoading ? this.renderLoader() : this.renderMatchList()}</div>
  }
}
export default TeamMatches
