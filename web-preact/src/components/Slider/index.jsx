import './index.css';

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import * as _propTypes from 'prop-types';

var _propTypes2 = _interopRequireDefault(_propTypes);

import * as _react from 'react';

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideModal = function (_Component) {
	_inherits(SlideModal, _Component);

	function SlideModal(props) {
		_classCallCheck(this, SlideModal);

		var _this = _possibleConstructorReturn(this, (SlideModal.__proto__ || Object.getPrototypeOf(SlideModal)).call(this, props));

		_this.onAnimationEnd = function (e) {
			if (e.animationName === 'slideOut--right' || e.animationName === 'slideOut--left') {
				_this.setState({ isOpen: false });
			}
		};

		_this.onWrapperClick = function (e) {
			var className = e.target.getAttribute("class") || '';
			if (className.includes('js-slideWrapper') && _this.props.onOutsideClick && !_this.props.foldMode) {
				_this.props.onOutsideClick();
			}
		};

		var contentStyle = void 0;
		var offset = props.verticalOffset;
		var verticalOffset = offset ? (offset.top ? offset.top : 0) + (offset.bottom ? offset.bottom : 0) : 0;

		var headerFooterHeight = void 0;

		if (!_this.props.footer && !_this.props.title && !_this.props.header) {
			headerFooterHeight = 0;
		} else if (_this.props.footer) {
			headerFooterHeight = _this.props.footerHeight;
		} else if (_this.props.header || _this.props.title) {
			headerFooterHeight = _this.props.headerHeight;
		} else {
			headerFooterHeight = _this.props.footerHeight + _this.props.headerHeight;
		}

		contentStyle = { height: 'calc(100vh - ' + (headerFooterHeight + verticalOffset) + 'px)' };

		_this.state = {
			isOpen: _this.props.foldMode ? true : !!props.isOpen,
			wrapperClass: 'SlideWrapper--open',
			sliderClass: 'SlideModal--open',
			contentStyle: contentStyle
		};
		return _this;
	}

	_createClass(SlideModal, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.bodyElement = document.getElementsByTagName('body')[0];
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (!prevState.isOpen && this.state.isOpen) {
				this.bodyElement.classList.add('h-overflowHidden');
			} else if (prevState.isOpen && !this.state.isOpen) {
				this.bodyElement.classList.remove('h-overflowHidden');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.isOpen && !nextProps.isOpen) {
				this.setState({
					sliderClass: 'SlideModal--close',
					wrapperClass: 'SlideWrapper--close'
				});
			} else if (!this.props.isOpen && nextProps.isOpen) {
				this.setState({
					isOpen: true,
					wrapperClass: 'SlideWrapper--open',
					sliderClass: 'SlideModal--open'
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.bodyElement.classList.remove('h-overflowHidden');
		}
	}, {
		key: 'render',
		value: function render() {
			var offsetStyle = this.props.verticalOffset ? {
				top: this.props.verticalOffset.top,
				bottom: this.props.verticalOffset.bottom
			} : {};

			var foldStyle = this.props.foldMode && this.props.isFolded ? {
				width: this.props.foldWidth,
				minWidth: 'auto'
			} : {};
			var foldOverlayStyles = this.props.foldMode ? {
				zIndex: '0',
				position: 'static'
			} : {};

			var sliderDirectionClassName = this.props.leftToRight ? 'SlideModal SlideModal--left ' : 'SlideModal SlideModal--right ';

			return this.state.isOpen || this.props.foldMode ? _react2.default.createElement(
				'div',
				{
					onAnimationEnd: this.onAnimationEnd,
					className: 'SlideWrapper js-slideWrapper' + ' ' + this.state.wrapperClass,
					onClick: this.onWrapperClick,
					style: _extends({}, offsetStyle, foldOverlayStyles)
				},
				_react2.default.createElement(
					'div',
					{ className: sliderDirectionClassName + this.state.sliderClass,
						style: _extends({}, offsetStyle, foldStyle) },
					_react2.default.createElement(
						'div',
						{ className: 'h-displayFlex h-flexCol h-flexSpaceBetween', style: { height: '100%' } },
						this.props.title || this.props.header ? _react2.default.createElement(
							'div',
							{ className: 'SlideModal__header js-slideModalHeader', style: { height: this.props.headerHeight } },
							this.props.title && _react2.default.createElement(
								'h4',
								{ className: 'SlideModal__title' },
								this.props.title
							),
							this.props.header
						) : null,
						_react2.default.createElement(
							'div',
							{ className: 'h-overflowAuto ' + this.state.contentClass,
								style: this.state.contentStyle },
							this.props.children
						),
						this.props.footer && _react2.default.createElement(
							'div',
							{ className: 'SlideModal__header SlideModal__footer', style: { height: this.props.footerHeight } },
							this.props.footer
						)
					)
				)
			) : null;
		}
	}]);

	return SlideModal;
}(_react.Component);

SlideModal.propTypes = {
	isOpen: _propTypes2.default.bool,
	onOutsideClick: _propTypes2.default.func,
	title: _propTypes2.default.string,
	footer: _propTypes2.default.node,
	header: _propTypes2.default.node,
	children: _propTypes2.default.node,
	verticalOffset: _propTypes2.default.shape({
		top: _propTypes2.default.number,
		bottom: _propTypes2.default.number
	}),
	foldWidth: _propTypes2.default.string,
	foldMode: _propTypes2.default.bool,
	leftToRight: _propTypes2.default.bool,
	headerHeight: _propTypes2.default.number,
	footerHeight: _propTypes2.default.number
};
SlideModal.defaultProps = {
	foldWidth: '140px',
	headerHeight: 65,
	footerHeight: 65
};

export default SlideModal;