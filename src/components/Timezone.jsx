'use strict';

import React from 'react';
import _ from 'lodash';
import Moment from 'moment-timezone';

import 'styles/Timezone.scss';


const Timezone = React.createClass({

  format(date, child, index = 0) {
    let { zone, offset } = this.props;
    let children = child.props.children;
    let newchildren;

    if (_.isArray(children)) {
      newchildren = children.map(this.format.bind(this, date));
    }
    else if (_.isPlainObject(children)) {
      newchildren = this.format(date, children);
    }
    else {
      if (zone) {
        newchildren = Moment(date).tz(zone).format(children);
      }
      else {
        offset = parseInt(offset, 10);

        if (_.isNaN(offset)) {
          offset = date.getTimezoneOffset();
        }

        // The time-zone offset is the difference, in minutes, between UTC and
        // local time. Note that this means that the offset is positive if the
        // local timezone is behind UTC and negative if it is ahead. For example,
        // if your time zone is UTC+10 (Australian Eastern Standard Time),
        //  -600 will be returned. Daylight saving time prevents this value
        // from being a constant even for a given locale.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        //
        // In the meantime, in Moment.js:
        //    NOTE: Unlike moment.fn.zone this function returns the real offset
        //    from UTC, not the reverse offset (as returned by Date.prototype.getTimezoneOffset).
        // http://momentjs.com/docs/#/manipulating/utc-offset/
        offset *= -1;
        newchildren = Moment(date).utcOffset(offset).format(children);
      }
    }

    return React.cloneElement(
      child,
      { key: `tz.time.${Math.random()}` },
      newchildren
    );
  },

  render() {
    let { children, ts } = this.props;
    let date = new Date();
    let content;

    if (!_.isArray(children)) {
      children = [children];
    }

    if (ts) {
      date = new Date(parseInt(ts, 10));
    }

    content = children.map(this.format.bind(this, date));

    return (
      <div {...this.props}>{content}</div>
    );
  }
});

export default Timezone;