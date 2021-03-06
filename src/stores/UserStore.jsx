'use strict';

import Immutable from 'immutable';
import Reflux from 'reflux';
import UserActions from 'actions/UserActionCreators';
import TimezoneStore from 'stores/TimezoneStore';


const UserStore = Reflux.createStore({

  listenables: UserActions,

  init() {
    let storage;

    try {
      let fromLocalStorage = localStorage.getItem('clockette');

      if (fromLocalStorage) {
        let arr = JSON.parse(fromLocalStorage);
        if (Array.isArray(arr)) {
          storage = arr;
        }
        else {
          throw new Error('localStorage data wasn\'t readable');
        }
      }
      else {
        throw new Error('No localStorage found');
      }
    }
    catch (e) {
      storage = [];
    }

    this.data = Immutable.List(
      storage.map((tz) => {
        return TimezoneStore.getBy('zone', tz.zone).first();
      })
    );
  },

  save() {
    localStorage.setItem('clockette', JSON.stringify(this.data.toArray()));
    this.trigger(this.data);
  },

  onAdd(zone) {
    this.data = this.data.push(zone);
    this.save();
  },

  onRemove(zone) {
    this.data = this.data.delete(this.data.indexOf(zone));
    this.save();
  },

});

export default UserStore;
