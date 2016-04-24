'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIAL_STATE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.setEntries = setEntries;
exports.next = next;
exports.restart = restart;
exports.vote = vote;

var _immutable = require('immutable');

var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.Map)();

function setEntries(state, entries) {
  var list = (0, _immutable.List)(entries);
  return state.set('entries', list).set('initialEntries', list);
}

function getWinners(vote) {
  if (!vote) return [];

  var _vote$get = vote.get('pair');

  var _vote$get2 = _slicedToArray(_vote$get, 2);

  var one = _vote$get2[0];
  var two = _vote$get2[1];

  var oneVotes = vote.getIn(['tally', one], 0);
  var twoVotes = vote.getIn(['tally', two], 0);
  if (oneVotes > twoVotes) return [one];else if (oneVotes < twoVotes) return [two];else return [one, two];
}

function next(state) {
  var round = arguments.length <= 1 || arguments[1] === undefined ? state.getIn(['vote', 'round'], 0) : arguments[1];

  var entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote').remove('entries').set('winner', entries.first());
  } else {
    return state.merge({
      vote: (0, _immutable.Map)({
        round: round + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

function restart(state) {
  var round = state.getIn(['vote', 'round'], 0);
  return next(state.set('entries', state.get('initialEntries')).remove('vote').remove('winner'), round);
}

function removePreviousVote(voteState, voter) {
  var previousVote = voteState.getIn(['votes', voter]);
  if (previousVote) {
    return voteState.updateIn(['tally', previousVote], function (t) {
      return t - 1;
    }).removeIn(['votes', voter]);
  } else {
    return voteState;
  }
}

function addVote(voteState, entry, voter) {
  // Update to EVE, then

  // Update Redux state
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(['tally', entry], 0, function (t) {
      return t + 1;
    }).setIn(['votes', voter], entry);
  } else {
    return voteState;
  }
}

function vote(voteState, entry, voter) {
  return addVote(removePreviousVote(voteState, voter), entry, voter);
}
//# sourceMappingURL=core.js.map