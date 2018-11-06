import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeFirstName, changeSecondName } from "../../actions/main";

class Main extends Component {
  render() {
    const {
      firstName,
      secondName,
      changeFirstName,
      changeSecondName
    } = this.props;

    return (
      <div>
        <div>
          <input
            type="text"
            value={firstName}
            placeholder="first name type here"
            onChange={event => {
              changeFirstName(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            value={secondName}
            placeholder="second name type here"
            onChange={event => {
              changeSecondName(event.target.value);
            }}
          />
        </div>
        <div>{`${firstName} ${secondName}`}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.mainReducer.firstName,
    secondName: state.mainReducer.secondName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFirstName: bindActionCreators(changeFirstName, dispatch),
    changeSecondName: bindActionCreators(changeSecondName, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
