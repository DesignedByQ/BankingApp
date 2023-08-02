import React from 'react';
import PropTypes from 'prop-types'

const Text = ({ children }) => {
    return <div>{children}</div>;
}

Text.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Text;