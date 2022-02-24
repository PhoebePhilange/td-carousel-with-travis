//START:P1
import React from 'react';
// START_HIGHLIGHT
import PropTypes from 'prop-types';
// END_HIGHLIGHT

export default (Component, propName, upperBoundPropName) =>
  class ComponentWithAutoAdvance extends React.PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

//END:P1
//START:P2
    // START_HIGHLIGHT
    static propTypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]).isRequired,
      autoAdvanceDelay: PropTypes.number.isRequired,
    };

    static defaultProps = {
      autoAdvanceDelay: 10e3,
    };

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps[propName] !== this.props[propName] ||
        prevProps[upperBoundPropName] !== this.props[upperBoundPropName]
      ) {
        this.startTimer(); //<callout id="co.start-timer" />
      }
    }

    componentWillUnmount() {
      clearTimeout(this._timer); //<callout id="co.clear-timeout" />
    }

    startTimer() {
      clearTimeout(this._timer); //<callout id="co.reset-timeout" />
      if (!this.props.autoAdvanceDelay) return;

      let upperBound; //<callout id="co.upper-bound" />
      if (typeof this.props[upperBoundPropName] === 'number') {
        upperBound = this.props[upperBoundPropName];
      } else if (this.props[upperBoundPropName] != null) {
        upperBound = this.props[upperBoundPropName].length;
      }

      this._timer = setTimeout(() => {
        this.props[`${propName}Increment`](upperBound);
      }, this.props.autoAdvanceDelay);
    }
    // END_HIGHLIGHT

    render() {
      // START_HIGHLIGHT
      const { autoAdvanceDelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
      // END_HIGHLIGHT
    }
  };
  //END:P2
