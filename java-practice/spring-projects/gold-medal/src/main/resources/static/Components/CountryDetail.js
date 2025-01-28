import React from 'react';
import GoldMedalMetrics from '../utils/GoldMedalMetrics';


class CountryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: GoldMedalMetrics.fixName(props.match.params.countryName),
      countryDetails: {
        'name': '-',
        'gdp': '-',
        'population': '-',
        'numberMedals': '-',
        'numberSummerWins': '-',
        'percentageTotalSummerWins': '-',
        'yearFirstSummerWin': '-',
        'numberWinterWins': '-',
        'percentageTotalWinterWins': '-',
        'yearFirstWinterWin': '-',
        'numberEventsWonByFemaleAthletes': '-',
        'numberEventsWonByMaleAthletes': '-'
      }
    };
  }

  componentDidMount() {
    GoldMedalMetrics.getCountryDetails(GoldMedalMetrics.fixName(this.state.countryName)).then(countryDetails => {
      if(Object.keys(countryDetails).length) {
        this.setState({countryDetails: countryDetails});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const newCountryName = GoldMedalMetrics.fixName(nextProps.match.params.countryName);
    this.setState({countryName: newCountryName});
    GoldMedalMetrics.getCountryDetails(newCountryName).then(countryDetails => {
      if(Object.keys(countryDetails).length) {
        this.setState({countryDetails: countryDetails});
      }
    });
  }

  render() {
    return (
      <div>
      <h2 className="subheader">{this.state.countryName}</h2>
      <table id="country-detail-table">
        <tbody>
        <tr>
          <td className="table-descriptor">GROSS DOMESTIC PRODUCT</td>
          <td className="table-descriptor">POPULATION</td>
          <td className="table-descriptor"># OF GOLD MEDALS</td>
        </tr>
        <tr>
          <td className="table-value">{this.state.countryDetails.gdp}</td>
          <td className="table-value">{this.state.countryDetails.population}</td>
          <td className="table-value">{this.state.countryDetails.numberMedals}</td>
        </tr>
        <tr>
          <td className="table-descriptor"># OF SUMMER OLYMPIC WINS</td>
          <td className="table-descriptor">% OF SUMMER OLYMPIC WINS</td>
          <td className="table-descriptor">FIRST YEAR OF A SUMMER OLYMPIC WIN</td>
        </tr>
        <tr>
          <td className="table-value">{this.state.countryDetails.numberSummerWins}</td>
          <td className="table-value">{this.state.countryDetails.percentageTotalSummerWins}</td>
          <td className="table-value">{this.state.countryDetails.yearFirstSummerWin}</td>
        </tr>
        <tr>
          <td className="table-descriptor"># OF WINTER OLYMPIC WINS</td>
          <td className="table-descriptor">% OF WINTER OLYMPIC WINS</td>
          <td className="table-descriptor">FIRST YEAR OF A WINTER OLYMPIC WIN</td>
        </tr>
        <tr>
          <td className="table-value">{this.state.countryDetails.numberWinterWins}</td>
          <td className="table-value">{this.state.countryDetails.percentageTotalWinterWins}</td>
          <td className="table-value">{this.state.countryDetails.yearFirstWinterWin}</td>
        </tr>
        <tr>
          <td className="table-descriptor"># OF EVENTS WON BY FEMALE ATHLETES</td>
          <td className="table-descriptor"># OF EVENTS WON BY MALE ATHLETES</td> 
        </tr>
        <tr>
          <td className="table-value">{this.state.countryDetails.numberEventsWonByFemaleAthletes}</td>
          <td className="table-value">{this.state.countryDetails.numberEventsWonByMaleAthletes}</td>
        </tr>
        </tbody>
      </table>
      </div>
    );
  };
}

export default CountryDetail;
