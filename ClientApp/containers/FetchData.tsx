import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store/types';
import { WeatherForecastsState } from '../store/types/weatherForecasts';
import { weatherForecastActions } from '../store/actions/weatherForecasts';
import { RequestStatus } from '../constants';

type WeatherForecastProps =
    WeatherForecastsState
    & typeof weatherForecastActions
    & RouteComponentProps<{ startDateIndex: string }>;

class FetchData extends React.Component<WeatherForecastProps, {}> {
    requestData(props: WeatherForecastProps, oldProps?: WeatherForecastProps) {
        if (!oldProps || props.match.params.startDateIndex !== oldProps.match.params.startDateIndex) {
            let startDateIndex = parseInt(props.match.params.startDateIndex, 10) || 0;
            this.props.weatherForecastRequest({ startDateIndex });
        }
    }

    componentDidMount() {
        this.requestData(this.props);
    }

    componentWillReceiveProps(nextProps: WeatherForecastProps) {
        this.requestData(nextProps, this.props);
    }

    public render() {
        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderForecastsTable()}
                {this.renderPagination()}
            </div>
        );
    }

    private renderForecastsTable() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {this.props.forecasts.map(forecast =>
                    <tr key={forecast.dateFormatted}>
                        <td>{forecast.dateFormatted}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {
        const startDateIndex = this.props.startDateIndex || 0;

        const prevStartDateIndex = startDateIndex - 5;
        const nextStartDateIndex = startDateIndex + 5;

        return (
            <p className="clearfix text-center">
                <Link className="btn btn-default pull-left" to={`/fetchdata/${ prevStartDateIndex }`}>Previous</Link>
                <Link className="btn btn-default pull-right" to={`/fetchdata/${ nextStartDateIndex }`}>Next</Link>
                {this.props.requestStatus !== RequestStatus.Success ? <span>Loading...</span> : []}
            </p>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.weatherForecasts,
    weatherForecastActions
)(FetchData) as typeof FetchData;
