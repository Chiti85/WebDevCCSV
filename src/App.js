import React from "react";
import result from "./data.json";
import InputField from "./InputField";
import SearchButton from "./SearchButton";
import ShowResults from "./ShowResults";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SwitchStyle from "./SwitchStyle";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007BA7"
    },
    secondary: {
      main: "#02e2f2"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

class App extends React.Component {
  state = {
    inputCylinder: 0,
    inputSphere: 0,
    inputAddition: 0,
    results: [],
    darkMode: false
  };
  //it´s the filter that we apply to data.json
  findResults = (inputSphere, inputCylinder, inputAddition) => {
    console.log(inputSphere, inputCylinder, inputAddition);

    let productSphere = [...result.data];

    let filteredProducts = productSphere.filter(
      elm =>
        elm.maxSphere >= inputSphere &&
        elm.minSphere <= inputSphere &&
        elm.maxCylinder >= inputCylinder &&
        elm.minCylinder <= inputCylinder &&
        elm.maxAddition >= inputAddition &&
        elm.minAddition <= inputAddition
    );
    //to comeback to the initial view of all the products if we delete the search
    if (!inputSphere && !inputCylinder && !inputAddition)
      this.setState({ results: result.data });
    else this.setState({ results: filteredProducts });

    console.log(productSphere);
  };
  //the connection between findResult and the SearchBUtton.
  //we pass the information
  onSearch = () => {
    this.findResults(
      this.state.inputSphere,
      this.state.inputCylinder,
      this.state.inputAddition
    );
    console.log("to be done");
  };

  onChange = (key, value) => {
    this.setState({ [key]: value });
  };
  toggledarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };
  //to deploy all the info in the data.json in the screem
  componentDidMount() {
    this.setState({ results: result.data });
  }
  render() {
    const {
      darkMode,
      inputSphere,
      inputCylinder,
      inputAddition,
      results
    } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className={darkMode ? "AppDark" : "AppLight"}>
          <Grid className="searchField">
            <InputField
              inputField={inputSphere}
              name="inputSphere"
              label="Sphere"
              onChange={this.onChange}
            />

            <InputField
              inputField={inputCylinder}
              name="inputCylinder"
              label="Cylinder"
              onChange={this.onChange}
            />

            <InputField
              inputField={inputAddition}
              name="inputAddition"
              label="Addition"
              onChange={this.onChange}
            />

            <SearchButton onSearch={this.onSearch} />
          </Grid>
          <Grid className={darkMode ? "serchResult" : "serchResultLight"}>
            <ShowResults results={results} />
          </Grid>

          <SwitchStyle
            darkMode={this.state.darkMode}
            toggledarkMode={this.toggledarkMode}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
