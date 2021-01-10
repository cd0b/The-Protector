"use strict";

import {_TEST_ENABLED_, _TEST_} from './test.js';
import {_GAME_} from './game.js';

if(_TEST_ENABLED_)
    _TEST_();
else
    _GAME_();