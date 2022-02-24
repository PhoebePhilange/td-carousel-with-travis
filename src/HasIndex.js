//START:P1
import React from 'react';
// START_HIGHLIGHT
import PropTypes from 'prop-types';
// END_HIGHLIGHT

// START_HIGHLIGHT
const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`; // <callout id="co.capitalize" />
// END_HIGHLIGHT

// START_HIGHLIGHT
export default (Component, indexPropName) => {
  const defaultIndexPropName = `default${capitalize(indexPropName)}`;
  // END_HIGHLIGHT

  return class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName ||
      Component.name})`;

    // START_HIGHLIGHT
    static propTypes = {
      [indexPropName]: PropTypes.number, // <callout id="co.computed-property-names" />
      [defaultIndexPropName]: PropTypes.number,
      onIndexChange: PropTypes.func,
    };

    static defaultProps = {
      [defaultIndexPropName]: 0,
    };

    static getDerivedStateFromProps(props, state) { // <callout id="co.get-derived-state" />
      if (
        props[indexPropName] != null &&
        props[indexPropName] !== state.index
      ) {
        return { index: props[indexPropName] };
      }
      return null;
    }

    constructor(props) { // <callout id="co.constructor" />
      super(props);

      this.state = {
        index: props[defaultIndexPropName],
      };
    }
    // END_HIGHLIGHT

//END:P1
//START:P2
    handleDecrement = upperBound => {
      // START_HIGHLIGHT
      const { onIndexChange } = this.props;
      // END_HIGHLIGHT
      this.setState(({ index }) => {
        const newIndex = upperBound
          ? (index + upperBound - 1) % upperBound
          : index - 1;
        // START_HIGHLIGHT
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex } });
        }
        // END_HIGHLIGHT
        return {
          index: newIndex,
        };
      });
    };

    handleIncrement = upperBound => {
      // START_HIGHLIGHT
      const { onIndexChange } = this.props;
      // END_HIGHLIGHT
      this.setState(({ index }) => {
        const newIndex = upperBound ? (index + 1) % upperBound : index + 1;
        // START_HIGHLIGHT
        if (onIndexChange) {
          onIndexChange({ target: { value: newIndex } });
        }
        // END_HIGHLIGHT
        return {
          index: newIndex,
        };
      });
    };

    render() {
      // START_HIGHLIGHT
      const {
        [defaultIndexPropName]: _defaultIndexProp,
        ...rest
      } = this.props;
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Decrement`]: this.handleDecrement,
        [`${indexPropName}Increment`]: this.handleIncrement,
      };
      // END_HIGHLIGHT
      return <Component {...rest} {...indexProps} />;
    }
  };
};
//END:P2
