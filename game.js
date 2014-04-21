/*********************************************
 * Tululoo Game Maker v2.0.0
 *
 * Creators 
 * Zoltan Percsich
 * Vadim "YellowAfterlife" Dyachenko
 *
 * (c) SilentWorks 2011 - 2013
 * All rights reserved.
 * www.tululoo.com
 *
 * Contributors:
 * Csaba Herbut
 ********************************************/

function tu_detect_audio(_type) {
	var _au = document.createElement('audio');
	return _au.canPlayType && _au.canPlayType(_type).replace(/no/, '');
}
//
var	__path__ = window.__path__ ? window.__path__ : '',
	// system variables:
	tu_gameloop = tu_canvas = tu_context = tu_room_to_go = null, tu_canvas_id = 'tululoocanvas',
	tu_canvas_css = 'background: rgb(42, 42, 42); border: 0;',
	tu_loading = tu_load_total = 0,
	var_override_ = (Object.defineProperty != undefined),
	// resources:
	tu_sprites = [], tu_audios = [], tu_backgrounds = [], tu_fonts = [], tu_scenes = [],
	// time:
	tu_frame_time = tu_frame_step = tu_frame_el = tu_frame_count = tu_elapsed = 0,
	tu_prev_cycle_time = tu_prev_frame_time = (new Date()).getTime(),
	// math:
	max = Math.max, min = Math.min, round = Math.round, floor = Math.floor, ceil = Math.ceil,
	sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, tan = Math.tan, rand = Math.random,
	arccos = Math.acos, arcsin = Math.asin, arctan = Math.atan, arctan2 = Math.atan2,
	tu_r2d = -180 / Math.PI, tu_d2r = Math.PI / -180, tu_2pi = Math.PI * 2,
	// i/o variables:
	mouse_x = mouse_y = 0, mouse_down = mouse_pressed = mouse_released = false,
	key_down = [], key_pressed = [], key_released = [], tu_vkeys = [],
	tu_keys_pressed = [], tu_keys_released = [],
	touch_x = [], touch_y = [], touch_count = 0,
	tu_unpausekey = 27, tu_paused = false, tu_modal = null, tu_modaldraw = true,
	// i/o constants:
	vk_0 = 48, vk_1 = 49, vk_2 = 50, vk_3 = 51, vk_4 = 52, vk_5 = 53, vk_6 = 54,
	vk_7 = 55, vk_8 = 56, vk_9 = 57, vk_a = 65, vk_add = 107, vk_alt = 18, vk_b = 66,
	vk_backspace = 8, vk_c = 67, vk_ctrl = 17, vk_d = 68, vk_decimal = 110, vk_delete = 46,
	vk_divide = 111, vk_down = 40, vk_e = 69, vk_end = 35, vk_enter = 13, vk_escape = 27,
	vk_f1 = 112, vk_f2 = 113, vk_f3 = 114, vk_f4 = 115, vk_f5 = 116, vk_f6 = 117,
	vk_f7 = 118, vk_f8 = 119, vk_f9 = 120, vk_f10 = 121, vk_f11 = 122, vk_f12 = 123,
	vk_g = 71, vk_h = 72, vk_home = 36, vk_f = 70, vk_i = 73, vk_insert = 45, vk_j = 74, vk_k = 75,
	vk_l = 76, vk_left = 37, vk_m = 77, vk_multiply = 106, vk_n = 78, vk_num0 = 96, vk_num1 = 97,
	vk_num2 = 98, vk_num3 = 99, vk_num4 = 100, vk_num5 = 101, vk_num6 = 102, vk_num7 = 103,
	vk_num8 = 104, vk_num9 = 105, vk_o = 79, vk_p = 80, vk_pagedown = 34, vk_pageup = 33,
	vk_pause = 19, vk_q = 81, vk_r = 82, vk_right = 39, vk_s = 83, vk_shift = 16, vk_space = 32,
	vk_subtract = 109, vk_t = 84, vk_tab = 9, vk_u = 85, vk_up = 38, vk_v = 86, vk_w = 87,
	vk_x = 88, vk_y = 89, vk_z = 90,
	// collisions:
	ct_null = 0, ct_point = 1, ct_box = 2, ct_circle = 3,
	// tiles:
	tu_tiles = [], tu_tilesi = [], tu_tilez = 256,
	// sound variables:
	tu_wav_supported = tu_detect_audio('audio/wav; codecs="1"'),
	tu_ogg_supported = tu_detect_audio('audio/ogg; codecs="vorbis"'),
	tu_mp3_supported = tu_detect_audio('audio/mpeg;'),
	// drawing:
	tu_draw_alpha = 1, tu_draw_color_red = tu_draw_color_green = tu_draw_color_blue = 0,
	tu_draw_font = "Arial 12px", tu_draw_halign = "left", tu_draw_valign = "top",
	tu_draw_font_ = { size: 12, family: 'Arial', bold: false, italic: false },
	tu_draw_color = "rgb(" + tu_draw_color_red + "," + 
	tu_draw_color_green + "," + tu_draw_color_blue + ")", 
	tu_redraw, tu_redraw_auto = true,
	tu_viewport_inst = null,
	// drawing constants:
	fa_left = "left", fa_center = "center", fa_right = "right",
	fa_top = "top", fa_middle = "middle", fa_bottom = "bottom",
	// system room variables:
	tu_depth = [], tu_depthi = [], tu_depthu = [], tu_types = [], tu_persist = [],
	// public room variables:
	room_current = null,
	room_speed = 30, fps = room_speed,
	room_background = null,
	room_width = 0, room_height = 0,
	room_background_color_show = true, room_background_color_red = 0, 
	room_background_color_green = 0, room_background_color_blue = 0,
	room_viewport_width = 0, room_viewport_height = 0,
	room_viewport_object = null,
	room_viewport_hborder = 0, room_viewport_vborder = 0,
	room_viewport_x = 0, room_viewport_y = 0,
	global = null;
// keyboard functions:
function keyboard_check(_key) { return key_down[_key]; }
function keyboard_check_pressed(_key) { return key_pressed[_key]; }
function keyboard_check_released(_key) { return key_released[_key]; }
// mouse functions:
function mouse_check() { return mouse_down; }
function mouse_check_pressed() { return mouse_pressed; }
function mouse_check_released() { return mouse_released; }
// virtual keys:
function vkey() {
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.bottom = 0;
	this.key = 0;
	this.down = false;
	this.active = true;
}
function vkey_add(_x, _y, _w, _h, _k) {
	var _v = new vkey();
	_v.left = _x;
	_v.top = _y;
	_v.right = _x + _w;
	_v.bottom = _y + _h;
	_v.width = _w;
	_v.height = _h;
	_v.key = _k;
	tu_vkeys.push(_v);
	return _v;
}
// misc:
function trace() { console.log.apply(console, arguments); }
function tu_idle() { } // left empty on purpose
// minimal math:
function abs(_value) { return _value < 0 ? -_value : _value; }
function sign(_value) { return _value > 0 ? 1 : _value < 0 ? -1 : 0; }
function choose() { return arguments[~~(Math.random() * arguments.length)]; }
function random(_value) { return Math.random() * _value; }
function irandom(_value) { return ~~(Math.random() * _value + 1); }
// trig functions:
function lengthdir_x(_length, _direction) { return _length * Math.cos(_direction * tu_d2r); }
function lengthdir_y(_length, _direction) { return _length * Math.sin(_direction * tu_d2r); }
function point_distance(_x1, _y1, _x2, _y2) { return Math.sqrt(Math.pow(( _x1 - _x2), 2) + Math.pow((_y1 - _y2), 2)); }
function point_direction(_x1, _y1, _x2, _y2) { return Math.atan2(_y2 - _y1, _x2 - _x1) * tu_r2d; }
function degtorad(_degree) { return _degree * tu_d2r; }
function radtodeg(_degree) { return _degree * tu_r2d; }
// sound functions:
function sound_mode(_sound, _mode) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	switch (_sound.type) {
	case "wav": if (!tu_wav_supported) return; break;
	case "ogg": if (!tu_ogg_supported) return; break;
	case "mp3": if (!tu_mp3_supported) return; break;
	}
	if (_mode != 3) {
		_sound.audio.pause();
		if (_mode != 0) {
			_sound.audio.currentTime = 0;
		} else return;
		_sound.audio.loop = _mode > 1;
	}
	_sound.audio.play();
}
function sound_play(_sound) { sound_mode(_sound, 1); }
function sound_loop(_sound) { sound_mode(_sound, 2); }
function sound_resume(_sound) { sound_mode(_sound, 3); }
function sound_stop(_sound) { sound_mode(_sound, 0); }
function sound_stop_all() { for ( var _s = 0; _s < tu_audios.length; _s++) sound_stop( tu_audios[_s] ); }
function sound_volume( _sound, _volume) {
	if (_sound.audio.networkState == _sound.audio.NETWORK_NO_SOURCE) return;
	_sound.audio.volume = _volume;
}
// draw sprite:
function draw_sprite(_sprite_index, _sub_image, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image > _sprite_index.frames.length - 1) _sub_image = 0;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset, -_sprite_index.yoffset);
	tu_context.restore();
}
function draw_sprite_part(_sprite_index, _sub_image, _left, _top, _width, _height, _x, _y) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.globalAlpha = tu_draw_alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], _left, _top, _width, _height, 0, 0, _width, _height);
	tu_context.restore();
}
function draw_sprite_ext(_sprite_index, _sub_image, _x, _y, _xscale, _yscale, _rotation, _alpha) {
	if (_sprite_index == null) return;
	if (_sub_image >= _sprite_index.frames.length) _sub_image = _sub_image % _sprite_index.frames.length;
	tu_context.save();
	tu_context.translate(_x - room_viewport_x, _y - room_viewport_y);
	tu_context.rotate(degtorad(_rotation));
	tu_context.scale(_xscale, _yscale);
	tu_context.globalAlpha = _alpha;
	tu_context.drawImage(_sprite_index.frames[~~_sub_image], -_sprite_index.xoffset , -_sprite_index.yoffset, _sprite_index.width, _sprite_index.height);
	tu_context.restore();
}
// draw text:
function draw_text(_x, _y, _text) {
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.fillText( _text, _x - room_viewport_x, _y - room_viewport_y );
}
// draw shapes:
function draw_rectangle(_x1, _y1, _x2, _y2, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	if (_outline) tu_context.strokeRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	else tu_context.fillRect( _x1- room_viewport_x, _y1 - room_viewport_y, _x2 - _x1, _y2 - _y1 );
	tu_context.closePath();
}
function draw_circle(_x, _y, _r, _outline) {
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.arc( _x - room_viewport_x, _y - room_viewport_y, _r, 0, tu_2pi, true );
	tu_context.closePath();
	!_outline ? tu_context.fill() : tu_context.stroke();
}

function draw_line(_x1, _y1, _x2, _y2) {
	tu_context.strokeStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.beginPath();
	tu_context.moveTo( _x1 - room_viewport_x, _y1 - room_viewport_y );
	tu_context.lineTo( _x2 - room_viewport_x, _y2 - room_viewport_y );
	tu_context.closePath();
	tu_context.stroke();	
}
// draw settings:
function draw_set_alpha(_alpha) {
	tu_draw_alpha = _alpha;
}
function draw_set_color( _r, _g, _b) {
	tu_draw_color_red = _r;
	tu_draw_color_green = _g;
	tu_draw_color_blue = _b;
	tu_draw_color = tu_draw_color_red + "," + tu_draw_color_green + "," + tu_draw_color_blue;
	tu_context.fillStyle = "rgba(" + tu_draw_color + ", " + tu_draw_alpha + ")";
	tu_context.strokeStyle = "rgb(" + tu_draw_color + ")";
}
function draw_set_linewidth(_width) { tu_context.lineWidth = _width; }
// draw settings - font:
function draw_set_font (_font) {
	tu_draw_font_ = _font;
	tu_draw_font = (_font.bold == 1 ? "bold" : "") + " " + (_font.italic == 1 ? "italic" : "") + " " + _font.size + "px " + _font.family;
	tu_context.font = tu_draw_font;
	tu_context.textAlign = tu_draw_halign;
	tu_context.textBaseline = tu_draw_valign;
}
function draw_set_halign(_halign) { tu_draw_halign = _halign; }
function draw_set_valign(_valign) { tu_draw_valign = _valign; }
// room translations:
function room_goto(_scene) {
	tu_viewport_inst = null;
	tu_room_to_go = _scene;
}
function room_goto_next() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri + 1)] == "object") room_goto(tu_scenes[_ri + 1]);
}
function room_goto_previous() {
	var _ri = 0, _r;
	for (_r = 0; _r < tu_scenes.length; _r++) if (tu_scenes[_r] == room_current) _ri = _r;
	if (typeof tu_scenes[(_ri - 1)] == "object") room_goto(tu_scenes[_ri - 1]);
}
function room_goto_first() { room_goto(tu_scenes[0]); }
function room_goto_last() { room_goto(tu_scenes[(tu_scenes.length - 1)]); }
function room_restart() { room_goto(room_current); }
// instance functions:
function instance_create_(_x, _y, _object) {
	var o = new _object.constructor;
	o.parameters = arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : [];
	o.object_index = _object;
	o.__instance = true;
	o.xstart = o.x = _x;
	o.ystart = o.y = _y;
	o._depth = o.depthstart;
	instance_activate(o);
	return o;
}
function instance_create(_x, _y, _object) {
	var o = instance_create_.apply(this, arguments);
	o.on_creation();
	return o;
}
function instance_number(_object) {
	return instance_list(_object).length;
}
function instance_first(_object) {
	var l = instance_list(_object);
	return l.length ? l[0] : null;
}
// BBox <> BBox
function collide_bbox_bbox(l1, t1, r1, b1, l2, t2, r2, b2) {
	return !(b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2);
}
// BBox <> SpriteBox
// (left, top, right, bottom, instX, instY, scaleX, scaleY, sprite, ofsX, ofsY)
function collide_bbox_sbox(l1, t1, r1, b1, x2, y2, h2, v2, s2) {
	return
	!( b1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| t1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| r1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| l1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> BBox
function collide_sbox_point(x2, y2, h2, v2, s2, x1, y1) {
	return
	!( y1 <= y2 + v2 * (s2.collision_top - s2.yoffset)
	|| y1 >= y2 + v2 * (s2.collision_bottom - s2.yoffset)
	|| x1 <= x2 + h2 * (s2.collision_left - s2.xoffset)
	|| x1 <= x2 + h2 * (s2.collision_right - s2.xoffset));
}
// SpriteBox <> Circle
function collide_sbox_circle(x2, y2, h2, v2, s2, x1, y1, r1) {
	var u, v, dx, dy;
	u = x2 + h2 * (s2.collision_left - s2.xoffset);
	v = x2 + h2 * (s2.collision_right - s2.xoffset);
	dx = (x2 < u ? u : x2 > v ? v : x2) - x2;
	u = y2 + v2 * (s2.collision_top - s2.yoffset);
	v = y2 + v2 * (s2.collision_bottom - s2.yoffset);
	dy = (y2 < u ? u : y2 > v ? v : y2) - y2;
	return (dx * dx + dy * dy < r1 * r1);
}
// BBox <> Point
function collide_bbox_point(l1, t1, r1, b1, x2, y2) {
	return (x2 > l1 && x2 < r1 && y2 > t1 && y2 < b1);
}
// BBox <> Circle
function collide_bbox_circle(l1, t1, r1, b1, x2, y2, r2) {
	var dx = (x2 < l1 ? l1 : x2 > r1 ? r1 : x2) - x2, 
		dy = (y2 < t1 ? t1 : y2 > b1 ? b1 : y2) - y2;
	return (dx * dx + dy * dy < r2 * r2);
}
// Circle <> Range
function collide_circle_range(dx, dy, dr) {
	return (dx * dx + dy * dy < dr * dr);
}
// Circle <> Circle
function collide_circle_circle(x1, y1, r1, x2, y2, r2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1 + r2);
}
// Circle <> Point
function collide_circle_point(x1, y1, r1, x2, y2) {
	return collide_circle_range(x1 - x2, y1 - y2, r1);
}
// instance collision checking:
function instance_position(_px, _py, _object, _mult) {
	var _x, _y, _ox, _oy, _sx, _sy, _o, _s, _i, _il, _r, _dx, _dy,
		_q = (_object.__instance ? [_object] : instance_list(_object)),
		_tm = (_mult) ? true : false;
	if (_tm) _ta = [];
	_il = _q.length;
	for (_i = 0; _i < _il; _i++) {
		_o = _q[_i];
		if (!_o.collision_checking) continue;
		_s = _o.sprite_index;
		if (!_s) continue;
		_x = _o.x; _sx = _o.image_xscale;
		_y = _o.y; _sy = _o.image_yscale;
		switch (_s.collision_shape)
		{
		case 0x2:
			if (_sx == 1 && _sy == 1) {
				_ox = _s.xoffset; _oy = _s.yoffset;
				if (!collide_bbox_point(_x + _s.collision_left - _ox, _y + _s.collision_top - _oy,
				_x + _s.collision_right - _ox, _y + _s.collision_bottom - _oy, _px, _py)) break;
			} else if (!collide_sbox_point(_x, _y, _sx, _sy, _s)) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		case 0x3:
			_r = _s.collision_radius * Math.max(_o.image_xscale, _o.image_yscale);
			_dx = _o.x + (_s.width / 2 - _s.xoffset) - _px;
			_dy = _o.y + (_s.height / 2 - _s.yoffset) - _py;
			if ((_dx * _dx) + (_dy * _dy) > _r * _r) break;
			if (!_tm) return _o;
			_ta.push(_o);
			break;
		}
	}
	return _tm ? _ta : null;
}
//
function __place_meeting__(nx, ny, what, many) {
	this.other = null;
	var i, l,
		// sprite, scale:
		ts = this.sprite_index,
		tsx, tsy, tfx, tfy, tst,
		// circle:
		tcx, tcy, tcr,
		// bbox:
		tbl, tbr, tbt, tbb,
		// instances, multiple, output, types:
		tz, tm, ct, ch, ra,
		// other:
		o, ox, oy, os, ost, osx, osy, ofx, ofy, ofr;
	if (ts == null) return false;
	tfx = ts.xoffset;
	tfy = ts.yoffset;
	tsx = this.image_xscale;
	tsy = this.image_yscale;
	tst = ts.collision_shape;
	// bbox:
	if (tst == 2) {
		tbl = nx + tsx * (ts.collision_left - tfx);
		tbr = nx + tsx * (ts.collision_right - tfx);
		tbt = ny + tsy * (ts.collision_top - tfy);
		tbb = ny + tsy * (ts.collision_bottom - tfy);
	}
	// circle:
	if (tst == 3) {
		tcr = ts.collision_radius * (tsx > tsy ? tsx : tsy);
		tcx = nx + tsx * (ts.width / 2 - tfx);
		tcy = ny + tsy * (ts.height / 2 - tfy);
	}
	//
	tz = (what.__instance ? [what] : instance_list(what));
	tm = many ? true : false;
	if (tm) ra = [];
	l = tz.length;
	for (i = 0; i < l; i++) {
		o = tz[i];
		if (!o.collision_checking) continue;
		os = o.sprite_index;
		if (os == null) continue;
		ox = o.x; osx = o.image_xscale;
		oy = o.y; osy = o.image_yscale;
		ost = os.collision_shape;
		ct = (tst << 4) | ost;
		ch = false;
		switch(ct) {
		case 0x22:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_bbox(tbl, tbt, tbr, tbb,
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy)) break;
			} else if (!collide_bbox_sbox(tbl, tbt, tbr, tbb, ox, oy, osx, osy, os)) break;
			ch = true;
			break;
		case 0x23:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_bbox_circle(tbl, tbt, tbr, tbb, ofx, ofy, ofr)) break;
			ch = true;
			break;
		case 0x32:
			if (osx == 1 && osy == 1) {
				ofx = os.xoffset; ofy = os.yoffset;
				if (!collide_bbox_circle(
				ox + os.collision_left - ofx, oy + os.collision_top - ofy,
				ox + os.collision_right - ofx, oy + os.collision_bottom - ofy,
				tcx, tcy, tcr)) break;
			} else if (!collide_sbox_circle(ox, oy, osx, osy, os, tcx, tcy, tcr)) break;
			ch = true;
			break;
		case 0x33:
			ofr = os.collision_radius * (osx > osy ? osx : osy);
			ofx = ox + osx * (os.width / 2 - os.xoffset);
			ofy = oy + osy * (os.height / 2 - os.yoffset);
			if (!collide_circle_circle(tcx, tcy, tcr, ofx, ofy, ofr)) break;
			ch = true;
			break;
		} if (!ch) continue;
		this.other = o;
		o.other = this;
		if (!tm) return (o);
		ra.push(o);
	} return ra;
}
function position_meeting(_x, _y, _object) {
	return instance_position(_x, _y, _object) != null;
}
function __move_towards_point__(_x, _y, _speed) {
	if (_speed == 0) return;
	if (this.x == _x && this.y == _y) return;
	var _dx = _x - this.x,
		_dy = _y - this.y,
		_dist = _dx * _dx + _dy * _dy;
	if (_dist < _speed * _speed) {
		this.x = _x;
		this.y = _y;
	} else {
		_dist = Math.sqrt(_dist);
		this.x += _dx * _speed / _dist;
		this.y += _dy * _speed / _dist;
	}
}

function __instance_destroy__() {
	tu_trash.push( this );
}
// web data:
function save_web_data(_name, _value) { if (window.localStorage) window.localStorage.setItem(_name, _value); }
function save_web_integer(_name, _value) { if (window.localStorage) window.localStorage.setItem("int_" + _name, _value); }
function save_web_float(_name, _value) { if (window.localStorage) window.localStorage.setItem("float_" + _name, _value); }
function save_web_string(_name, _value) { if (window.localStorage) window.localStorage.setItem("string_" + _name, _value); }
function load_web_data(_name) { if (window.localStorage) return window.localStorage.getItem(_name); }
function load_web_integer(_name) { if (window.localStorage) return parseInt(window.localStorage.getItem("int_" + _name)); }
function load_web_float(_name) { if (window.localStorage) return parseFloat(window.localStorage.getItem("float_" + _name)); }
function load_web_string(_name) { if (window.localStorage) return '' + window.localStorage.getItem("string_" + _name); }
function delete_web_data(_name) { if (window.localStorage) window.localStorage.removeItem(_name); }
function delete_web_integer(_name) { if (window.localStorage) window.localStorage.removeItem("int_" + _name); }
function delete_web_float(_name) { if (window.localStorage) window.localStorage.removeItem("float_" + _name); }
function delete_web_string(_name) { if (window.localStorage) window.localStorage.removeItem("string_" + _name); }
function clear_web_data() { if (window.localStorage) window.localStorage.clear(); }
function web_data_number() { if (window.localStorage) return window.localStorage.length; }
// misc functions:
function pause_game( _key) {
	tu_paused = true;
	tu_unpausekey = _key;
}
function modal_end() {
	if (tu_modal == null) return;
	tu_modal.instance_destroy();
	tu_modal = null;
}
function modal_start(_inst, _draw) {
	if (tu_modal != null) modal_end();
	tu_modal = _inst;
	tu_modaldraw = _draw;
}
//
function show_mouse() { tu_canvas.style.cursor = "default"; }
function hide_mouse() { tu_canvas.style.cursor = "none"; }
//
function tu_gettime() { return (new Date()).getTime(); }

/***********************************************************************
 * ENGINE
 ***********************************************************************/
 
function tu_global () { }
global = new tu_global();
//{ Events
function __keydownlistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	if (e.repeat) return;
	var keyCode = window.event ? e.which : e.keyCode;
	if (!key_down[keyCode]) {
		key_pressed[keyCode] = true;
		tu_keys_pressed.push(keyCode);
	}
	key_down[keyCode] = true;
	if (!r) e.preventDefault();
	return r;
};
function __keyuplistener__(e) {
	var r = true;
	if (!e) e = window.event;
	if (document.activeElement && document.activeElement == tu_canvas || document.activeElement == document.body) r = false;
	var keyCode = window.event ? e.which : e.keyCode;
	if (key_down[keyCode])
	{
		key_released[keyCode] = true;
		tu_keys_released.push(keyCode);
	}
	key_down[keyCode] = false;
	if (!r) e.preventDefault();
	return r;
};
function __touchsim__(_x, _y) {
	var r = [{}];
	r[0].pageX = tu_canvas.offsetLeft + _x;
	r[0].pageY = tu_canvas.offsetTop + _y;
	__touchvkey__(r);
}
function __mousemovelistener__(_e) {
	if (_e.pageX != undefined && _e.pageY != undefined) {
		mouse_x = _e.pageX;
		mouse_y = _e.pageY;
	} else {
		mouse_x = _e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouse_y = _e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	if (room_current != null) {
		mouse_x -= tu_canvas.offsetLeft;
		mouse_y -= tu_canvas.offsetTop;			
	}
	if (mouse_down) __touchsim__(mouse_x, mouse_y);
};
function __mousedownlistener__(_e) {
	//if (!mouse_down) mouse_pressed = true;
	//mouse_down = true;
	__touchsim__(mouse_x, mouse_y);
};
function __mouseuplistener__(_e) {
	//if (mouse_down) mouse_released = true;
	//mouse_down = false;
	__touchvkey__([]);
};
function __touchvkey__(_t) {
	var _tx = 0, _ty = 0, _tc = 0, _tl = _t.length, _vl = tu_vkeys.length, _i, _j, _c, _k,
		_dx = tu_canvas.offsetLeft, _dy = tu_canvas.offsetTop, _mx = _my = 1;
	if (tu_canvas.style.width) _mx 
	touch_x = []; touch_y = []; touch_count = 0;
	for (_i = 0; _i < _vl; _i++) tu_vkeys[_i].count = 0;
	for (_i = 0; _i < _tl; _i++) {
		_c = 0;
		for (_j = 0; _j < _vl; _j++) {
			if (!tu_vkeys[_j].active) continue;
			if (_t[_i].pageX - _dx > tu_vkeys[_j].right) continue;
			if (_t[_i].pageX - _dx < tu_vkeys[_j].left) continue;
			if (_t[_i].pageY - _dy < tu_vkeys[_j].top) continue;
			if (_t[_i].pageY - _dy > tu_vkeys[_j].bottom) continue;
			tu_vkeys[_j].count++;
			if (!tu_vkeys[_j].down) {
				tu_vkeys[_j].down = true;
				_k = tu_vkeys[_j].key;
				if (!key_down[_k]) {
					key_down[_k] = true;
					key_pressed[_k] = true;
					tu_keys_pressed.push(_k);
				}
			}
			_c++;
		}
		if (_c == 0) {
			_tx += _t[_i].pageX;
			_ty += _t[_i].pageY;
			touch_x[_tc] = _t[_i].pageX - _dx;
			touch_y[_tc] = _t[_i].pageY - _dy;
			_tc++;
		}
	}
	for (_i = 0; _i < _vl; _i++) {
		if (tu_vkeys[_i].count != 0) continue;
		if (!tu_vkeys[_i].down) continue;
		tu_vkeys[_i].down = false;
		_k = tu_vkeys[_i].key;
		if (key_down[_k]) {
			key_down[_k] = false;
			key_released[_k] = true;
			tu_keys_released.push(_k);
		}
	}
	touch_count = _tc;
	if (_tc != 0) {
		mouse_x = (_tx / _tc) - _dx;
		mouse_y = (_ty / _tc) - _dy;
		if (!mouse_down) {
			mouse_down = true;
			mouse_pressed = true;
		}
	} else if (mouse_down) {
		mouse_down = false;
		mouse_released = true;
	}
};
function __touchlistener__(e) {
	e.preventDefault();
	__touchvkey__(e.targetTouches);
};
//}
function tu_init () {
	if (document.addEventListener) {
		document.addEventListener("keydown", __keydownlistener__, false);
		document.addEventListener("keyup", __keyuplistener__, false);
		document.addEventListener("mousemove", __mousemovelistener__, false);
		document.addEventListener("mousedown", __mousedownlistener__, false);
		document.addEventListener("mouseup", __mouseuplistener__, false);
		document.addEventListener("touchstart", __touchlistener__, false);
		document.addEventListener("touchend", __touchlistener__, false);
		document.addEventListener("touchmove", __touchlistener__, false);
		document.addEventListener("touchenter", __touchlistener__, false);
		document.addEventListener("touchleave", __touchlistener__, false);
		document.addEventListener("touchcancel", __touchlistener__, false);
	} else {
		document.attachEvent("onkeydown", __keydownlistener__);
		document.attachEvent("onkeyup", __keyuplistener__);
		document.attachEvent("onmousemove", __mousemovelistener__);
		document.attachEvent("onmousedown", __mousedownlistener__);
		document.attachEvent("onmouseup", __mouseuplistener__);
	}
	// initialize keycodes
	for (var _k = 0; _k < 256; _k++) {
		key_down[_k] = key_pressed[_k] = key_released[_k] = false;
	}
}

function tu_loading_inc() { tu_loading++; tu_load_total++; }
function tu_loading_dec() { tu_loading--; }

function _$_(_id_) {
	return document.getElementById( _id_ );
}

function var_override(_what, _svar, _fget, _fset) {
	if (var_override_) {
		if (_what.hasOwnProperty(_svar)) return;
		Object.defineProperty(_what, _svar, {
			get: _fget,
			set: _fset
		});
	} else {
		if (_what.__lookupGetter__(_svar) != undefined) return;
		_what.__defineGetter__(_svar, _fget);
		_what.__defineSetter__(_svar, _fset);
	}
}

//{ Depth
function _tu_depth_find(_d) {
	var _tl = tu_depthi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_depthi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function _tu_depth_new(_d) {
	var _i = _tu_depth_find(_d), _o = [];
	tu_depth.splice(_i, 0, _o);
	tu_depthi.splice(_i, 0, _d);
	return _i;
}
function tu_depth_add(_d, _o) {
	var _t = tu_depthi.indexOf(_d);
	if (_t == -1) _t = _tu_depth_new(_d); // create array if none
	tu_depth[_t].push(_o);
}
function tu_depth_delete(_d, _o) {
	var _t = tu_depth[tu_depthi.indexOf(_d)], _ti = _t.indexOf(_o);
	if (_ti == -1) return;
	_t.splice(_ti, 1);
}
function tu_depth_update() {
	var i, l = tu_depthu.length, o;
	if (l == 0) return;
	for (i = 0; i < l; i++) {
		o = tu_depthu[i];
		if (o.instance_active && o._depth !== undefined) tu_depth_delete(o._depth, o);
		o._depth = o._depthn;
		if (o.instance_active && o._depth !== undefined) tu_depth_add(o._depth, o);
		o._depthu = false;
	}
	tu_depthu = [];
}
// Accessors:
function tu_depth_get() { return this._depth; }
function tu_depth_set(_d) {
	if (this._depth == _d) return; // don't change on depth match
	this._depthn = _d;
	if (this._depthu) return;
	this._depthu = true;
	tu_depthu.push(this);
}
//}
//{ Types
function instance_list(_o) {
	var _t = _o._object_index_;
	if (tu_types[_t] == undefined) tu_types[_t] = [];
	return tu_types[_t];
}
function tu_type_add(_d, _o) {
	instance_list(_d).push(_o);
}
function tu_type_delete(_o, _p) {
	var _d = tu_types[_p], _t = _d.indexOf(_o);
	_d.splice(_t, 1);
}
function tu_type_get() { return this._object_index; }
//}
//{ Tileset functions
function tile_layer_find(_d) {
	var _tl = tu_tilesi.length, _td, _ti;
	for (_ti = 0; _ti < _tl; _ti++) {
		_td = tu_tilesi[_ti];
		if (_d > _td) return _ti;
	}
	return _tl;
}
function tile_layer_add(_d) {
	var _i = tile_layer_find(_d), _o = [];
	tu_tiles.splice(_i, 0, _o);
	tu_tilesi.splice(_i, 0, _d);
	return _o;
}
function tile(_s, _x, _y, _l, _t, _w, _h) {
	this.source = _s;
	this.x = _x;
	this.y = _y;
	this.left = _l;
	this.top = _t;
	this.width = _w;
	this.height = _h;
	this.width2 = _w;
	this.height2 = _h;
	this.sectors = [];
}
function tile_add(_b, _l, _t, _w, _h, _x, _y, _z) {
	var	_tx1 = Math.floor(_x / tu_tilez),
		_ty1 = Math.floor(_y / tu_tilez),
		_tx2 = Math.floor((_x + _w) / tu_tilez),
		_ty2 = Math.floor((_y + _h) / tu_tilez),
		_tt = new tile(_b, _x, _y, _l, _t, _w, _h),
		_tx, _ty, _ts,
		_d, _e = tu_tilesi.indexOf(_z);
	if (_e != -1) _d = tu_tiles[_e];
	else _d = tile_layer_add(_z);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_d[_tx] == null) _d[_tx] = [];
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_d[_tx][_ty] == null) _d[_tx][_ty] = [];
			_ts = _d[_tx][_ty];
			_ts.push(_tt);
			_tt.sectors.push(_ts);
		}
	}
	return _tt;
}
function tile_find(_x, _y, _w, _h, _d) {
	var _xw = _x + _w,
		_yh = _y + _h,
		_r = [],
		_tx, _ty, _ti, _tl, _ts, _tt, _ta,
		_tx1, _ty1, _tx2, _ty2;
	_ti = tu_tilesi.indexOf(_d);
	if (_ti == -1) return _r;
	_ta = tu_tiles[_ti];
	_tx1 = Math.floor(_x / tu_tilez);
	_ty1 = Math.floor(_y / tu_tilez);
	_tx2 = Math.floor((_x + _w) / tu_tilez);
	_ty2 = Math.floor((_y + _h) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_ta[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_ta[_tx][_ty] == null) continue;
			_ts = _ta[_tx][_ty];
			_tl = _ts.length;
			for (_ti = 0; _ti < _tl; _ti++) {
				_tt = _ts[_ti];
				if (_tt.x >= _xw) continue;
				if (_tt.y >= _yh) continue;
				if (_tt.x + _tt.width2 < _x) continue;
				if (_tt.y + _tt.height2 < _y) continue;
				_r.push(_tt);
			}
		}
	}
	return _r;
}
function tile_delete(_t) {
	var _ti, _tl, _ts;
	_tl = _t.sectors.length;
	for (_ti = 0; _ti < _tl; _ti++) {
		_ts = _t.sectors[_ti];
		_ts.splice(_ts.indexOf(_t), 1);
	}
}
function tile_srender(_s) {
	var _ti, _tt;
	for (_ti = 0; _ti < _s.length; _ti++) {
		if (_s[_ti] == null) continue;
		_tt = _s[_ti];
		if (_tt.source == null) continue;
		if (_tt.source.image == null) continue;
		tu_context.drawImage(_tt.source.image, _tt.left, _tt.top, _tt.width, _tt.height, _tt.x - room_viewport_x, _tt.y - room_viewport_y, _tt.width2, _tt.height2);
	}
}
function tile_lrender(_l) {
	var _tx, _ty,
		_tx1 = Math.floor(room_viewport_x / tu_tilez),
		_tx2 = Math.floor((room_viewport_x + room_viewport_width) / tu_tilez),
		_ty1 = Math.floor(room_viewport_y / tu_tilez),
		_ty2 = Math.floor((room_viewport_y + room_viewport_height) / tu_tilez);
	for (_tx = _tx1; _tx <= _tx2; _tx++) {
		if (_l[_tx] == null) continue;
		for (_ty = _ty1; _ty <= _ty2; _ty++) {
			if (_l[_tx][_ty] == null) continue;
			tile_srender(_l[_tx][_ty]);
		}
	}
}
//} /Tileset functions
//{ Some events & accessors
function tu_id_get() { return this; }
function tu_parent_get() { return this._parent_index; }
function image_single_get() { return (this.image_speed == 0 ? this.image_index : -1); }
function image_single_set(_o) { this.image_speed = 0; this.image_index = _o; }
// Handles object size & sprite updates. Should get rid of this in favor of accessors.
function __handle_sprite__(_object_) {
	if (_object_.sprite_index == null) return;
	_object_.sprite_width = _object_.sprite_index.width;
	_object_.sprite_height = _object_.sprite_index.height;
	_object_.sprite_xoffset = _object_.sprite_index.xoffset;
	_object_.sprite_yoffset = _object_.sprite_index.yoffset;
	_object_.image_number = _object_.sprite_index.frames.length;
	_object_.image_index += _object_.image_speed;
	if (_object_.image_index >= _object_.image_number) _object_.image_index = _object_.image_index % _object_.image_number;
	if (_object_.image_index < 0) _object_.image_index = _object_.image_number - 1 + (_object_.image_index % _object_.image_number);
}
function __draw_self__() {
	draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_alpha);
}
//}
//{ Inherited event lookup functions.
// There's also a way to do this with much shorter code.
function on_creation_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_creation !== on_creation_i)
	return o.on_creation.apply(this);
}
function on_destroy_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_destroy !== on_destroy_i)
	return o.on_destroy.apply(this);
}
function on_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_step !== on_step_i)
	return o.on_step.apply(this);
}
function on_end_step_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_end_step !== on_end_step_i)
	return o.on_end_step.apply(this);
}
function on_draw_d() {
	__handle_sprite__(this);
	__draw_self__.apply(this);
}
function on_draw_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_draw !== on_draw_i)
	return o.on_draw.apply(this);
	on_draw_d.apply(this);
}
function on_collision_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_collision !== on_collision_i)
	return o.on_collision.apply(this);
}
function on_animationend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_animationend !== on_animationend_i)
	return o.on_animationend.apply(this);
}
function on_roomstart_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomstart !== on_roomstart_i)
	return o.on_roomstart.apply(this);
}
function on_roomend_i() {
	for (var o = this.parent; o; o = o.parent)
	if (o.on_roomend !== on_roomend_i)
	return o.on_roomend.apply(this);
}
//} /Inherited event handles

// instance_init(this, object_index, parent_index, visible, depth, sprite, collideable, inner index)
// Universal object constructor:
function __instance_init__(_this, _oi, _p, _v, _d, _si, _c, _io) {
	_this._object_index = undefined;
	_this._object_index_ = _io;
	_this._depth = undefined;
	_this._depthn = undefined;
	_this._depthu = false;
	var_override(_this, 'depth', tu_depth_get, tu_depth_set );
	var_override(_this, 'object_index', tu_type_get, tu_idle );
	var_override(_this, 'image_single', image_single_get, image_single_set );
	var_override(_this, 'id', tu_id_get, tu_idle);
	var_override(_this, 'parent', tu_parent_get, tu_idle);
	_this._object_index = _oi;
	_this._parent_index = _p;
	_this.xstart = _this.xprevious = _this.x = 0;
	_this.ystart = _this.yprevious = _this.y = 0;
	_this.depthstart = _d;
	_this.image_angle = _this.direction = 0;
	_this.visible = _v;
	_this.image_yscale = _this.image_xscale = 1;
	_this.image_alpha = 1;
	_this.image_index = 0;
	_this.image_speed = 1;
	_this.sprite_index = _si;
	_this.speed = 0;
	_this.other = null;
	_this.collision_checking = _c;
	_this.persistent = false;
	_this.instance_active = false;
	// Instance-specific functions:
	_this.place_meeting = __place_meeting__;
	_this.move_towards_point = __move_towards_point__;
	_this.instance_destroy = __instance_destroy__;
	_this.draw_self = __draw_self__;
}
// Universal sprite constructor:
function __sprite_init__(_this, _name, _width, _height, _xofs, _yofs, _cshape, _crad, _cl, _cr, _ct, _cb, _frames) {
	_this.frames = [];
	var _frame, _fi;
	for (_fi = 0; _fi < _frames.length; _fi++) {
		_frame = new Image();
		if (_frames[_fi]) {
			tu_loading_inc();
			_frame.onload = tu_loading_dec;
			_frame.onerror = tu_loading_dec;
			_frame.src = _frames[_fi];
		}
		_this.frames.push(_frame);
	}
	_this.width = _width;
	_this.height = _height;
	_this.xoffset = _xofs;
	_this.yoffset = _yofs;
	_this.collision_shape = (_cshape == 'Circle' ? ct_circle : _cshape == 'Box' ? ct_box : 0);
	_this.collision_radius = _crad;
	_this.collision_left = _cl;
	_this.collision_right = _cr;
	_this.collision_top = _ct;
	_this.collision_bottom = _cb;
	tu_sprites.push(_this);
}
// Universal audio constructor:
function __audio_init__(_this, _name, _wav, _mp3, _ogg) {
	var _src = '';
	_this.type = 'none';
	if (tu_ogg_supported && (_ogg != '')) {
		_this.type = 'ogg';
		_src = _ogg;
	} else if (tu_mp3_supported && (_mp3 != '')) {
		_this.type = 'mp3';
		_src = _mp3;
	} else if (tu_wav_supported && (_wav != '')) {
		_this.type = 'wav';
		_src = _wav;
	}
	if (_src != '') {
		_this.audio = document.createElement('audio');
		_this.audio.setAttribute('src', _src);
	}
	tu_audios.push(_this);
}

function __background_init__(_this, _name, _file) {
	_this.image = new Image();
	tu_loading_inc();
	_this.image.onload = tu_loading_dec;
	_this.image.onerror = tu_loading_dec;
	_this.image.src = _file;
	tu_backgrounds.push(_this);
}

function __font_init__(_this, _name, _family, _size, _bold, _italic) {
	_this.family = _family;
	_this.size = _size;
	_this.bold = _bold;
	_this.italic = _italic;
	tu_fonts.push(_this);
}

// (this, name, width, height, speed, back. red, back. green, back. blue, background, back. tilex, back. tiley, back. stretch, view width, view height, view object, view hborder, view vborder)
function __room_start__(_this, _name, _rw, _rh, _rs, _br, _bg, _bb, _bi, _bx, _by, _bs, _vw, _vh, _vo, _vx, _vy) {
	_$_('tululoogame').innerHTML = "<canvas id='" + tu_canvas_id + "' width='" + _vw + "' height='" + _vh + "' style='" + tu_canvas_css + "'></canvas>";
	tu_canvas = _$_(tu_canvas_id);
	tu_context = tu_canvas.getContext('2d');
	room_current = _this;
	// generic:
	room_speed = _rs;
	room_width = _rw;
	room_height = _rh;
	// background color:
	room_background_color_red = _br;
	room_background_color_green = _bg;
	room_background_color_blue = _bb;
	// background image:
	room_background = _bi;
	room_background_x = 0;
	room_background_y = 0;
	room_background_tile_x = _bx;
	room_background_tile_y = _by;
	room_background_tile_stretch = _bs;
	// view:
	room_viewport_width = _vw;
	room_viewport_height = _vh;
	room_viewport_x = room_viewport_y = 0;
	room_viewport_object = _vo;
	room_viewport_hborder = _vx;
	room_viewport_vborder = _vy;
	// tiles:
	var _l, _b, _t, _i, _il, _tls_, i, l, d, o, a;
	_tls_ = _this.tiles; tu_tiles = []; tu_tilesi = [];
	for (_l = 0; _l < _tls_.length; _l++)
	for (_b = 1; _b < _tls_[_l].length; _b++)
	for (_t = 1; _t < _tls_[_l][_b].length; _t++)
	tile_add(_tls_[_l][_b][0], _tls_[_l][_b][_t][0], _tls_[_l][_b][_t][1], _tls_[_l][_b][_t][2], _tls_[_l][_b][_t][3], _tls_[_l][_b][_t][4], _tls_[_l][_b][_t][5], _tls_[_l][0]);
	// objects:
	tu_depth = []; tu_depthi = []; tu_depthu = []; tu_types = [];
	a = _this.objects;
	l = a.length;
	for (i = 0; i < l; i++) {
		d = a[i];
		d = d[0]; // temp.fix for rc2
		if (d.o === undefined) continue;
		o = instance_create_(d.x, d.y, d.o);
		if (d.s !== undefined) o.sprite_index = d.s;
		if (d.d !== undefined) o.direction = d.d;
		if (d.a !== undefined) o.image_angle = d.a;
		if (d.u !== undefined) o.image_xscale = d.u;
		if (d.v !== undefined) o.image_yscale = d.v;
		if (d.c !== undefined) d.c.apply(o);
	}
	// persistent objects:
	_l = tu_persist.length
	for (_t = 0; _t < _l; _t++) instance_activate(tu_persist[_t]);
	instance_foreach(function(o) {
		if (tu_persist.indexOf(o) != -1) return;
		o.on_creation();
	});
	tu_persist = [];
	//
	instance_foreach(function(o) {
		o.on_roomstart();
	});
}

function tu_preloader() {
	var _w = Math.min(400, (tu_canvas.width * 0.6) >> 0), _h = 16,
		_x = (tu_canvas.width - _w) >> 1, _y = (tu_canvas.height - _h) >> 1,
		_p = (tu_load_total - tu_loading) / tu_load_total,
		_s = "Loading resources: " + (tu_load_total - tu_loading) + "/" + (tu_load_total);
	tu_canvas.width = tu_canvas.width;
	tu_canvas.height = tu_canvas.height;
	tu_canvas.style.backgroundColor = "rgb(42, 42, 42)";
	tu_context.font = "italic 12px Verdana";
	tu_context.textAlign = "left";
	tu_context.textBaseline = "bottom";
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(192, 192, 192, 1)";
	tu_context.fillRect(_x - 1, _y - 1, _w + 2, _h + 2);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(0, 0, 0, 1)";
	tu_context.fillRect(_x, _y, _w, _h);
	tu_context.fillStyle = tu_context.strokeStyle = "rgba(255, 255, 255, 1)";
	tu_context.fillRect(_x + 2, _y + 2, (_w - 4) * _p, _h - 4);
	tu_context.fillText(_s, _x, _y - 2);
}

function tu_render_back() {
	if (room_background == null) return;
	if (room_background_tile_stretch) {
		tu_context.drawImage(room_background, 0 - room_viewport_x, 0 - room_viewport_y, room_width, room_height);
		return;
	}
	var _bw, _bh, _bx, _by, _vx, _vy, _vw, _vh, _x1, _x2, _y1, _y2, _ht, _vt;
	_bw = room_background.width;
	_bh = room_background.height;
	_bx = room_background_x;
	if (room_background_tile_x) { _bx = _bx < 0 ? _bw - _bx % _bw : _bx % _bw; }
	_by = room_background_y;
	if (room_background_tile_y) { _bx = _by < 0 ? _bh - _by % _bh : _by % _bh; }
	//
	_vx = room_viewport_x;
	_vy = room_viewport_y;
	_vw = room_viewport_width;
	_vh = room_viewport_height;
	//
	_x1 = room_background_tile_x ? Math.floor(_vx / _bw) * _bw - _bx : -_bx;
	_x2 = room_background_tile_x ? Math.floor((_vx + _vw + _bw) / _bw) * _bw : _x1 + _bw;
	_y1 = room_background_tile_y ? Math.floor(_vy / _bh) * _bh - _by : -_by;
	_y2 = room_background_tile_y ? Math.floor((_vy + _vh + _bh) / _bh) * _bh : _y1 + _bh;
	for (_ht = _x1; _ht < _x2; _ht += _bw)
	for (_vt = _y1; _vt < _y2; _vt += _bh)
	tu_context.drawImage(room_background, _ht - _vx, _vt - _vy);
}
// @1.2.6
function instance_activate(_i) {
	if (_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_add(o, _i);
	//tu_type_add(_i._object_index, _i);
	//if (_i.parent != null) tu_type_add(_i.parent, _i);
	tu_depth_add(_i._depth, _i);
	_i.instance_active = true;
}
// @1.2.6
function instance_deactivate(_i) {
	if (!_i.instance_active) return;
	for (var o = _i._object_index; o; o = o.parent) tu_type_delete(o._object_index_, _i);
	//tu_type_delete(_i, _i._object_index_);
	//if (_i.parent != null) tu_type_delete(_i, _i.parent._object_index_);
	tu_depth_delete(_i._depth, _i);
	_i.instance_active = false;
}
// @1.2.6 Performs function for all instances
function instance_foreach(_function) {
	var _d, _l, _o;
	for (_d in tu_depth) {
		_l = tu_depth[_d];
		for (_o = 0; _o < _l.length; _o++) _function(_l[_o]);
	}
}
// @1.2.6 Performs function for all instances on specific depth
function instance_fordepth(_depth, _function) {
	var _o, _d = tu_depthc[_depth], _l;
	if (_d == null) return;
	_l = _d.length;
	for (_o = 0; _o < _l; _o++) _function(_d[_o]);
}
// @1.2.6 Actions performed on room switch
function tu_room_switchto_(_o) {
	_o.on_roomend();
	if (!_o.persistent) return;
	tu_persist.push(_o);
	instance_deactivate(_o);
}
function tu_room_switchto(_dest) {
	tu_persist = [];
	instance_foreach(tu_room_switchto_);
	room_current = _dest;
	tu_room_to_go = null;
	room_current.start();
}
// @1.0.0 Global step event
function tu_step() {
	// object step events:
	tu_trash = [];
	var tu_deptho, tu_depthl, _obj_, _objd_, _h, _v;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			// is viewport object?
			if (room_viewport_object != null && tu_viewport_inst == null && (_obj_.object_index == room_viewport_object || _obj_.parent == room_viewport_object)) {
				tu_viewport_inst = _obj_;
			}
			// step events:
			_obj_.on_step();
			// move object:
			if (_obj_.speed != 0) {
				_objd_ = _obj_.direction * tu_d2r;
				_obj_.x += _obj_.speed * Math.cos(_objd_);
				_obj_.y += _obj_.speed * Math.sin(_objd_);
			}
			// post-step events:
			_obj_.on_collision();
			_obj_.on_end_step();
			// post:
			_obj_.xprevious = _obj_.x;
			_obj_.yprevious = _obj_.y;
		}
	}
	// follow object
	if (tu_viewport_inst != null) {
		_h = min(room_viewport_hborder, room_viewport_width / 2);
		_v = min(room_viewport_vborder, room_viewport_height / 2);
		// hborder:
		if (tu_viewport_inst.x < room_viewport_x + _h) room_viewport_x = tu_viewport_inst.x - _h;
		if (tu_viewport_inst.x > room_viewport_x + room_viewport_width - _h) room_viewport_x = tu_viewport_inst.x - room_viewport_width + _h;
		// vborder:
		if (tu_viewport_inst.y < room_viewport_y + _v) room_viewport_y = tu_viewport_inst.y - _v;
		if (tu_viewport_inst.y > room_viewport_y + room_viewport_height - _v) room_viewport_y = tu_viewport_inst.y - room_viewport_height + _v;
		// limits:
		room_viewport_x = Math.max(0, Math.min(room_viewport_x, room_width - room_viewport_width)) >> 0;
		room_viewport_y = Math.max(0, Math.min(room_viewport_y, room_height - room_viewport_height)) >> 0;
	}
}

function tu_draw() {
	// clear canvas:
	if (room_background_color_show) {
		tu_canvas.width = tu_canvas.width;
		tu_canvas.height = tu_canvas.height;
		// set background color:
		tu_canvas.style.backgroundColor = "rgb(" + room_background_color_red + "," + room_background_color_green + "," + room_background_color_blue + ")";
	}
	tu_render_back();
	tile_layer_last = 0;
	var tu_depthc, tu_depthv, tu_deptho, tu_depthl, _obj_;
	for (tu_depthd in tu_depth) {
		tu_depthc = tu_depth[tu_depthd];
		tu_depthv = tu_depthi[tu_depthd];
		for (; tu_tilesi[tile_layer_last] >= tu_depthv && tile_layer_last < tu_tiles.length; tile_layer_last++)
		{
			tile_lrender(tu_tiles[tile_layer_last]);
		}
		tu_depthl = tu_depthc.length;
		for (tu_deptho = 0; tu_deptho < tu_depthl; tu_deptho++) {
			_obj_ = tu_depthc[tu_deptho];
			if (_obj_.visible) _obj_.on_draw();
			_obj_.on_animationend();
		}
	}
	// render remaining tile layers:
	for (; tile_layer_last < tu_tiles.length; tile_layer_last++) {
		tile_lrender(tu_tiles[tile_layer_last]);
	}
}

function tu_prestep() {
	// clear mouse states and keypressed / keyrelesed statuses
	mouse_pressed = false;
	mouse_released = false;
	var _k, _r, _obj_;
	for (_k = 0; _k < tu_keys_pressed.length; _k++) key_pressed[tu_keys_pressed[_k]] = false;
	for (_k = 0; _k < tu_keys_released.length; _k++) key_released[tu_keys_released[_k]] = false;
	tu_keys_pressed = [];
	tu_keys_released = [];
	// remove objects from destroy stack
	for (_r = 0; _r < tu_trash.length; _r++) {
		_obj_ = tu_trash[_r];
		if (tu_modal == _obj_) tu_modal = null;
		_obj_.depth = undefined;
		tu_type_delete(_obj_, _obj_._object_index_);
		if (_obj_.parent != null) tu_type_delete(_obj_, _obj_.parent._object_index_);
		_obj_.on_destroy();
	}
}

function tu_loop() {
	// calculate render time
	tu_frame_time = tu_gettime();
	tu_elapsed = (tu_frame_time - tu_prev_frame_time);
	tu_frame_step += tu_elapsed;
	tu_frame_el += tu_elapsed;
	// continue game with the UN-Pause key
	if (tu_paused && keyboard_check_pressed(tu_unpausekey)) tu_paused = false;
	//
	if (tu_room_to_go != null && tu_canvas == null) tu_room_switchto(tu_room_to_go);
	// render game:
	if (tu_frame_step >= 1000 / room_speed && tu_loading == 0 && tu_canvas != null && !tu_paused) {
		tu_frame_count++;
		tu_elapsed = tu_frame_time - tu_prev_cycle_time;
		tu_prev_cycle_time = tu_frame_time;
		tu_frame_step -= 1000 / room_speed;
		if (tu_frame_step < 0 || tu_frame_step > 1024) tu_frame_step = 0;
		// start next room, if any:
		if (tu_room_to_go != null) tu_room_switchto(tu_room_to_go);
		//
		tu_redraw = tu_redraw_auto;
		if (tu_modal != null) {
			tu_modal.on_step();
			if (tu_modal != null) tu_modal.on_end_step();
		} else tu_step();
		tu_depth_update();
		if (tu_redraw) {
			if (tu_modal == null || tu_modaldraw) tu_draw();
			else tu_modal.on_draw();
		}
		tu_depth_update();
		tu_prestep();
		tu_depth_update();
	} else if (tu_loading > 0) tu_preloader();
	// calculate fps:
	if (tu_frame_el >= Math.floor(200 / room_speed) * 5 * room_speed)
	{
		fps = Math.ceil(tu_frame_count * 1000 / tu_frame_el);
		if (fps > room_speed) fps = room_speed;
		tu_frame_el = tu_frame_count = 0;
	}
	// repeat
	tu_prev_frame_time = tu_frame_time;
	setTimeout(tu_gameloop, 5);
}
tu_init();

/***********************************************************************
 * EXTENSIONS
 ***********************************************************************/



/***********************************************************************
 * SPRITES
 ***********************************************************************/
function __playbuttonsprite() { 
__sprite_init__(this, playbuttonsprite, 279, 129, 0, 0, 'Box', 139, 0, 279, 0, 129, ['img/playbuttonsprite_0.png','img/playbuttonsprite_1.png']);
}; var playbuttonsprite = new __playbuttonsprite();

function __menubuttonsprite() { 
__sprite_init__(this, menubuttonsprite, 307, 129, 0, 0, 'Box', 153, 0, 307, 0, 129, ['img/menubuttonsprite_0.png','img/menubuttonsprite_1.png']);
}; var menubuttonsprite = new __menubuttonsprite();

function __storybuttonsprite() { 
__sprite_init__(this, storybuttonsprite, 339, 129, 0, 0, 'Box', 169, 0, 339, 0, 129, ['img/storybuttonsprite_0.png','img/storybuttonsprite_1.png']);
}; var storybuttonsprite = new __storybuttonsprite();

function __playagainbuttonsprite() { 
__sprite_init__(this, playagainbuttonsprite, 339, 137, 0, 0, 'Box', 169, 0, 339, 0, 137, ['img/playagainbuttonsprite_0.png','img/playagainbuttonsprite_1.png']);
}; var playagainbuttonsprite = new __playagainbuttonsprite();

function __controlsprite() { 
__sprite_init__(this, controlsprite, 2, 2, 1, 1, 'Box', 1, 0, 2, 0, 2, ['img/controlsprite_0.png']);
}; var controlsprite = new __controlsprite();

function __animalsprite() { 
__sprite_init__(this, animalsprite, 89, 80, 44, 40, 'Box', 44, 0, 89, 0, 80, ['img/animalsprite_0.png','img/animalsprite_1.png','img/animalsprite_2.png','img/animalsprite_3.png','img/animalsprite_4.png','img/animalsprite_5.png','img/animalsprite_6.png','img/animalsprite_7.png','img/animalsprite_8.png','img/animalsprite_9.png','img/animalsprite_10.png','img/animalsprite_11.png','img/animalsprite_12.png','img/animalsprite_13.png','img/animalsprite_14.png','img/animalsprite_15.png','img/animalsprite_16.png','img/animalsprite_17.png','img/animalsprite_18.png','img/animalsprite_19.png']);
}; var animalsprite = new __animalsprite();

function __foundmessage() { 
__sprite_init__(this, foundmessage, 654, 214, 327, 107, 'Box', 327, 0, 654, 0, 214, ['img/foundmessage_0.png']);
}; var foundmessage = new __foundmessage();

function __water_sprite() { 
__sprite_init__(this, water_sprite, 960, 720, 0, 0, 'Box', 480, 0, 960, 0, 720, ['img/water_sprite_0.png','img/water_sprite_1.png','img/water_sprite_2.png','img/water_sprite_3.png']);
}; var water_sprite = new __water_sprite();

function __found_bg_sprite() { 
__sprite_init__(this, found_bg_sprite, 960, 640, 0, 0, 'Box', 480, 0, 960, 0, 640, ['img/found_bg_sprite_0.png','img/found_bg_sprite_1.png','img/found_bg_sprite_2.png','img/found_bg_sprite_3.png']);
}; var found_bg_sprite = new __found_bg_sprite();

function __title_sprite() { 
__sprite_init__(this, title_sprite, 811, 369, 0, 0, 'Box', 405, 0, 811, 0, 369, ['img/title_sprite_0.png']);
}; var title_sprite = new __title_sprite();

function __cursor_sprite() { 
__sprite_init__(this, cursor_sprite, 78, 94, 65, 10, 'Box', 39, 0, 78, 0, 94, ['img/cursor_sprite_0.png']);
}; var cursor_sprite = new __cursor_sprite();

function __instruct_1_sprite() { 
__sprite_init__(this, instruct_1_sprite, 889, 88, 0, 0, 'Box', 444, 0, 889, 0, 88, ['img/instruct_1_sprite_0.png']);
}; var instruct_1_sprite = new __instruct_1_sprite();

function __next_sprite() { 
__sprite_init__(this, next_sprite, 279, 129, 0, 0, 'Box', 139, 0, 279, 0, 129, ['img/next_sprite_0.png','img/next_sprite_1.png']);
}; var next_sprite = new __next_sprite();

function __instruct_2() { 
__sprite_init__(this, instruct_2, 851, 176, 0, 0, 'Box', 425, 0, 851, 0, 176, ['img/instruct_2_0.png']);
}; var instruct_2 = new __instruct_2();

function __instruct_3() { 
__sprite_init__(this, instruct_3, 598, 162, 0, 0, 'Box', 299, 0, 598, 0, 162, ['img/instruct_3_0.png']);
}; var instruct_3 = new __instruct_3();

function __instruct_4() { 
__sprite_init__(this, instruct_4, 862, 87, 0, 0, 'Box', 431, 0, 862, 0, 87, ['img/instruct_4_0.png']);
}; var instruct_4 = new __instruct_4();

function __real_sprite() { 
__sprite_init__(this, real_sprite, 501, 129, 0, 0, 'Box', 250, 0, 501, 0, 129, ['img/real_sprite_0.png','img/real_sprite_1.png']);
}; var real_sprite = new __real_sprite();

function __read_sprite() { 
__sprite_init__(this, read_sprite, 397, 129, 0, 0, 'Box', 198, 0, 397, 0, 129, ['img/read_sprite_0.png','img/read_sprite_1.png']);
}; var read_sprite = new __read_sprite();

function __back_sprite() { 
__sprite_init__(this, back_sprite, 109, 91, 0, 0, 'Box', 54, 0, 109, 0, 91, ['img/back_sprite_0.png','img/back_sprite_1.png']);
}; var back_sprite = new __back_sprite();

function __restart_sprite() { 
__sprite_init__(this, restart_sprite, 431, 129, 0, 0, 'Box', 215, 0, 431, 0, 129, ['img/restart_sprite_0.png','img/restart_sprite_1.png']);
}; var restart_sprite = new __restart_sprite();

function __resume_sprite() { 
__sprite_init__(this, resume_sprite, 440, 129, 0, 0, 'Box', 220, 0, 440, 0, 129, ['img/resume_sprite_0.png','img/resume_sprite_1.png']);
}; var resume_sprite = new __resume_sprite();

function __pause_sprite() { 
__sprite_init__(this, pause_sprite, 109, 91, 0, 0, 'Box', 54, 0, 109, 0, 91, ['img/pause_sprite_0.png','img/pause_sprite_1.png']);
}; var pause_sprite = new __pause_sprite();



/***********************************************************************
 * SOUNDS
 ***********************************************************************/


/***********************************************************************
 * MUSICS
 ***********************************************************************/


/***********************************************************************
 * BACKGROUNDS
 ***********************************************************************/
function __pen() { 
__background_init__(this, pen, 'img/speedbg3.jpg')}; var pen = new __pen();

function __losebg() { 
__background_init__(this, losebg, 'img/lose_screen.jpg')}; var losebg = new __losebg();

function __menu_bg() { 
__background_init__(this, menu_bg, 'img/noah_titlebg.jpg')}; var menu_bg = new __menu_bg();

function __bible() { 
__background_init__(this, bible, 'img/bible.jpg')}; var bible = new __bible();



/***********************************************************************
 * FONTS
 ***********************************************************************/
function __youvesaved() { 
__font_init__(this, youvesaved, 'Comic Sans', 100, 1, 0)}; var youvesaved = new __youvesaved();



/***********************************************************************
 * OBJECTS
 ***********************************************************************/
function __playbutton() {
__instance_init__(this, playbutton, null, 1, -1, playbuttonsprite, 1, 0);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var playbutton = new __playbutton();

function __menubutton() {
__instance_init__(this, menubutton, null, 1, -5, menubuttonsprite, 1, 1);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var menubutton = new __menubutton();

function __storybutton() {
__instance_init__(this, storybutton, null, 1, -1, storybuttonsprite, 1, 2);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var storybutton = new __storybutton();

function __playagainbutton() {
__instance_init__(this, playagainbutton, null, 1, 0, playagainbuttonsprite, 1, 3);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var playagainbutton = new __playagainbutton();

function __hittest() {
__instance_init__(this, hittest, null, 1, 0, controlsprite, 1, 4);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var hittest = new __hittest();

function __menu_code() {
__instance_init__(this, menu_code, null, 1, 0, controlsprite, 1, 5);
this.on_creation = function() {
with(this) {
gamee.animalsArr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

gamee.hittest=instance_create(0,-2,hittest);


for(var i=0;i<gamee.animalsArr.length;i++){
	var n=instance_create(960-(i*240),425,caught);
	n.image_index=i;
	n.x=Math.random()*room_width;
	n.y=Math.random()*room_height;
	n.xinc=(Math.random()*3)+1;
	n.yinc=(Math.random()*3)+1;
	var pos=Math.round(Math.random());
	var posy=Math.round(Math.random());;
	if(pos==0){
		n.xinc*=-1;
	}
	if(posy==0){
		n.yinc*=-1;
	}
	
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(mouse_pressed){
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,playbutton)){
		instance_list(playbutton)[0].image_index=1;
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,storybutton)){
		instance_list(storybutton)[0].image_index=1;
	}

}

if(mouse_released){
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,playbutton)){
		room_goto(instructions_1);
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,storybutton)){
		room_goto(story_menu);
	}
	instance_list(playbutton)[0].image_index=0;
	instance_list(storybutton)[0].image_index=0;
}
var l=instance_list(caught);
for(var i=0;i<l.length;i++){
	l[i].x+=l[i].xinc;
	l[i].y+=l[i].yinc;
	if(l[i].x>960+l[i].sprite_index.width){
		
		l[i].x=0;
		l[i].y=Math.random()*room_height;
		
		
	}
	if(l[i].x+l[i].sprite_index.width<0){
		
		l[i].x=Math.abs(l[i].x)+room_width;
		l[i].y=Math.random()*room_height;
		
	}
	if(l[i].y>640+l[i].sprite_index.height){
		
		l[i].x=Math.random()*room_width;
		l[i].y=0;
		console.log(l[i].y);
	}
	if(l[i].y+(l[i].sprite_index.height/2)<0){
		
		l[i].x=Math.random()*room_width;
		l[i].y=Math.abs(l[i].y)+room_height;
	
	}
	
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var menu_code = new __menu_code();

function __startpen_code() {
__instance_init__(this, startpen_code, null, 1, 0, controlsprite, 1, 6);
this.on_creation = function() {
with(this) {
gamee.animalsArr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
gamee.matchesArr=[];
gamee.animalPair=null;
gamee.waterLevel=room_height;
gamee.animalClicked=0;
gamee.pairList=[];
gamee.endscreen=null;
gamee.date=new Date();
gamee.time=gamee.date.getTime();
gamee.elapsedTime=0;
gamee.lastTime=0;
gamee.instanceList=[];
gamee.lastMatch=null;
gamee.paused=false;

room_goto(continuepen);
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var startpen_code = new __startpen_code();

function __loose() {
__instance_init__(this, loose, null, 1, 0, animalsprite, 1, 7);
this.on_creation = function() {
with(this) {
this.image_speed=0;
this.xInc=Math.ceil(Math.random()*3);
this.yInc=Math.ceil(Math.random()*3);
var randx=Math.round(Math.random());
var randy=Math.round(Math.random());
if(randx==1)this.xInc*=-1;
if(randy==1)this.yInc*=-1;

this.x=Math.random()*(room_width-50);
if(this.x<50)this.x=50;
this.y=Math.random()*(room_height-100);
if(this.y<50)this.y=50;
if(this.y<150&&this.x<250){
	this.y+=150;
	this.x+=250;
}
var points=[[this.x-50,this.y-50],[this.x-50,this.y+50],[this.x+50,this.y-50],[this.x+50,this.y+50]];
for(var i=0;i<points.length;i++){
	var othr=place_meeting(points[i][0],points[i][1],loose);
	if(othr){
		if(this!=othr){
			if(this.yInc/this.xInc==othr.yInc/othr.xInc){
				this.yInc=-this.yInc;
		}
	}
		break;
	}
}

this.chosen=false;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var loose = new __loose();

function __caught() {
__instance_init__(this, caught, null, 1, 0, animalsprite, 1, 8);
this.on_creation = function() {
with(this) {
this.image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var caught = new __caught();

function __continuepen_code() {
__instance_init__(this, continuepen_code, null, 1, -2, controlsprite, 1, 9);
this.on_creation = function() {
with(this) {
console.log('continue');
while (gamee.animalsArr.length>1){
var num=Math.ceil(Math.random()*(gamee.animalsArr.length-1));
gamee.matchesArr.push(gamee.animalsArr[num]);
gamee.animalsArr.splice(num,1);
}
if(gamee.animalsArr.length==1){
gamee.matchesArr.push(gamee.animalsArr[0]);
gamee.animalsArr=[];
}

for(var i=0;i<20;i++){
	var m=instance_create(0,0, loose);
	m.image_index=i;
}
var n=instance_create(0,0,loose);
n.image_index=gamee.matchesArr[0];

gamee.instanceList=instance_list(loose);
gamee.pairList=instance_list(caught);


gamee.lastTime=gamee.date.getTime();

instance_create(0,gamee.waterLevel,water);
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
var wter=instance_list(water)[0];

if(wter.y>0){
wander(gamee.instanceList);
captured(gamee.pairList);
var dat=new Date();
if(gamee.paused==true){
gamee.elapsedTime+=gamee.date.getTime()-gamee.lastTime;
gamee.paused=false;
}
else{
gamee.elapsedTime+=dat.getTime()-gamee.lastTime;
}
gamee.lastTime=dat.getTime();
var playtime=(gamee.time+gamee.elapsedTime);
var perc=(playtime-gamee.time)/60000;
console.log(perc);
gamee.waterLevel=room_height-(room_height*perc);
wter.y=gamee.waterLevel;
if(mouse_pressed){
if(gamee.hittest.place_meeting(mouse_x,mouse_y,pausebutton)){
		
		instance_list(pausebutton)[0].image_index=1;
	}
}
if(mouse_released){
instance_list(pausebutton)[0].image_index=0;
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,pausebutton)){
		gamee.paused=true;
		gamee.date=new Date();
		room_goto(pausescreen);
	}
	var capt=gamee.hittest.place_meeting(mouse_x,mouse_y,caught);
	if(capt){
		var n=instance_create(capt.x,capt.y,loose);
		n.image_index=capt.image_index;
		capt.instance_destroy();
		gamee.pairList=instance_list(caught);
	}

	else if(gamee.pairList.length<2){

		var arr=gamee.instanceList;
		var marr=[];

		var temp={};
		for(var i=0;i<arr.length;i++){

			if(gamee.hittest.place_meeting(mouse_x,mouse_y,loose)==arr[i]){

				if(temp.mat){
					if(point_distance(mouse_x,mouse_y,arr[i].x,arr[i].y)<temp.dist){
						temp.mat=arr[i];
						temp.dist=point_distance(mouse_x,mouse_y,arr[i].x,arr[i].y);
					}
		
				}
				else{
					temp.mat=arr[i];
					temp.dist=point_distance(mouse_x,mouse_y,arr[i].x,arr[i].y);
				}
				arr[i].collision_checking=false;
			marr.push(arr[i]);
			}
		}

		for(var i=0;i<marr.length;i++){
			marr[i].collision_checking=true;
		}
		if(temp.mat){
			var cawt=instance_create(temp.mat.x,temp.mat.y,caught);
			cawt.image_index=temp.mat.image_index;
			temp.mat.instance_destroy();
			gamee.pairList=instance_list(caught);
		}
	}
	
}
}
else{
	endIt();

}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var continuepen_code = new __continuepen_code();

function __foundmatch_code() {
__instance_init__(this, foundmatch_code, null, 1, 0, controlsprite, 1, 10);
this.on_creation = function() {
with(this) {
instance_create(0,0,foundBG);
instance_create(0,gamee.waterLevel,water).depth=-1;
instance_create(100,300,caught).image_index=gamee.lastMatch;
instance_create(0,300,caught).image_index=gamee.lastMatch;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
var l=instance_list(caught);
for(var i=0;i<l.length;i++){
	l[i].move_towards_point(778,140,10);
	var dist=Math.abs(point_distance(778,140,l[i].x,l[i].y));
	if(dist<600){
		l[i].image_xscale=(dist/600)+.2;
		l[i].image_yscale=(dist/600)+.2;
	}
	if(l[i].x==778&&l[i].y==140){
		l[i].instance_destroy();
	}
}


}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
var saved=20-gamee.matchesArr.length;
draw_set_font(youvesaved);
draw_set_halign(fa_center);
draw_set_color(0,200,0);
draw_text(140,room_height/2-85,saved);
draw_set_color(240,0,0);
draw_text(140,room_height/2+25,gamee.matchesArr.length);

}
}
};
}; var foundmatch_code = new __foundmatch_code();

function __water() {
__instance_init__(this, water, null, 1, 0, water_sprite, 0, 11);
this.on_creation = function() {
with(this) {
this.image_alpha=.4;
this.image_speed=.25;


}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var water = new __water();

function __lose_code() {
__instance_init__(this, lose_code, null, 1, 0, controlsprite, 1, 12);
this.on_creation = function() {
with(this) {
gamee.hittest=instance_create(0,-2,hittest);
var pa=instance_create(580,room_height-150,playagainbutton);
//pa.image_xscale=.75;
//pa.image_yscale=.75;

var m=instance_create(40,room_height-150,menubutton);
//m.image_xscale=.75;
//m.image_yscale=.75;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {



if(mouse_pressed){
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,playagainbutton)){
		instance_list(playagainbutton)[0].image_index=1;
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,menubutton)){
		instance_list(menubutton)[0].image_index=1;
	}

}
if(mouse_released){
instance_list(playagainbutton)[0].image_index=0;
instance_list(menubutton)[0].image_index=0;
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,playagainbutton)){
		room_goto(startpen);
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,menubutton)){
		room_goto(menu);
	}

}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
draw_set_font(youvesaved);
draw_set_halign(fa_center);
draw_set_color(0,255,0);
draw_text(320,65,20-gamee.matchesArr.length);
draw_set_color(255,0,0);
draw_text(180,145,gamee.matchesArr.length);
}
}
};
}; var lose_code = new __lose_code();

function __foundBG() {
__instance_init__(this, foundBG, null, 1, 2, found_bg_sprite, 1, 13);
this.on_creation = function() {
with(this) {
this.image_speed=.25;

}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var foundBG = new __foundBG();

function __title() {
__instance_init__(this, title, null, 1, -1, title_sprite, 1, 14);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var title = new __title();

function __cursor() {
__instance_init__(this, cursor, null, 1, -1, cursor_sprite, 1, 18);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var cursor = new __cursor();

function __instructions_1_code() {
__instance_init__(this, instructions_1_code, null, 1, 0, controlsprite, 1, 19);
this.on_creation = function() {
with(this) {
instance_create(100,250,cursor);
instance_create(600,100, caught);
instance_create(500,150, caught).image_index=2;
instance_create(650,150, caught).image_index=2;
instance_create(0,room_height,water)
this.stp=1;

}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
var anim=instance_list(caught)[0];
var curs=instance_list(cursor)[0];
var matA=instance_list(caught)[1];
var matB=instance_list(caught)[2];

if(this.stp==1){
	
	curs.move_towards_point(anim.x,anim.y,10);
	if(curs.x==anim.x&&curs.y==anim.y){
		this.stp=2;	
	}
}
else if(this.stp==2){
anim.move_towards_point(120,100,15);

}

else if(this.stp==3){
	
	curs.move_towards_point(anim.x,anim.y,10);
	if(curs.x==anim.x&&curs.y==anim.y){
		this.stp=4;	
	}


}
else if(this.stp==4){
	anim.move_towards_point(600,100,10);
	

}
else if(this.stp==5){
	curs.move_towards_point(matA.x,matA.y,10);
	if(curs.x==matA.x&&curs.y==matA.y){
		this.stp=6;	
	}

}
else if(this.stp==6){
	matA.move_towards_point(120,100,15);
	curs.move_towards_point(matB.x,matB.y,10);
	if(curs.x==matB.x&&curs.y==matB.y){
		this.stp=7;	
	}


}
else if(this.stp==7){
matA.move_towards_point(120,100,15);
matB.move_towards_point(180,100,15);

}
else if(this.stp==8){
if(instance_list(next_button).length>0){
var nx=instance_list(next_button);
instance_create(nx[0].x,nx[0].y,playbutton);
nx[0].instance_destroy();
}
instance_list(water)[0].move_towards_point(0,room_height/2,15);

}

if(mouse_pressed){
if(place_meeting(mouse_x,mouse_y,next_button)){
instance_list(next_button)[0].image_index=1;
}
if(mouse_released){
instance_list(next_button)[0].image_index=0;
if(place_meeting(mouse_x,mouse_y,next_button)){
	
	switch(this.stp){
		case 1:
			anim.x=120;
			anim.y=100;
			cursor.x=600;
			cursor.y=100;
			this.stp=3;
			break;
		case 2:
			anim.x=120;
			anim.y=100;
			cursor.x=600;
			cursor.y=100;
			this.stp=3;
			break;
		case 3:	
			anim.x=600;
			anim.y=100;
			cursor.x=120;
			cursor.y=100;
			this.stp=5;
			break;
			
		case 4:
			anim.x=600;
			anim.y=100;
			cursor.x=120;
			cursor.y=100;
			this.stp=5;
			break;
		case 5:
			anim.x=600;
			anim.y=100;
			cursor.x=650;
			cursor.y=150;
			matA.x=120;
			matA.y=100;
			matB.x=180;
			matB.y=100;
			this.stp=7;
			break;
		case 6:
			anim.x=600;
			anim.y=100;
			cursor.x=650;
			cursor.y=150;
			matA.x=120;
			matA.y=100;
			matB.x=180;
			matB.y=100;
			this.stp=8;
			break;
		case 7:
			anim.x=600;
			anim.y=100;
			cursor.x=650;
			cursor.y=150;
			matA.x=120;
			matA.y=100;
			matB.x=180;
			matB.y=100;
			this.stp=8;
			break;
		case 8:
			
	
	}
}
else if(place_meeting(mouse_x,mouse_y,playbutton)){	
		room_goto(startpen);
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = function() {
if (this.visible == 1) {
__handle_sprite__(this);
with(this) {
switch(this.stp){

case 1:
	draw_sprite(instruct_1_sprite,0,25,300);
	break;
case 2:
	draw_sprite(instruct_1_sprite,0,25,300);
	break;
case 3:
	draw_sprite(instruct_2,0,60,300);
	break;
case 4:
	draw_sprite(instruct_2,0,60,300);
	break;
case 5:
	draw_sprite(instruct_3,0,60,300);
	break;
case 6:
	draw_sprite(instruct_3,0,60,300);
	break;
case 7:
	draw_sprite(instruct_3,0,60,300);
	break;
case 8:
	draw_sprite(instruct_4,0,50,300);
	break;


}
}
}
};
}; var instructions_1_code = new __instructions_1_code();

function __instruct_1() {
__instance_init__(this, instruct_1, null, 1, 0, instruct_1_sprite, 1, 20);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var instruct_1 = new __instruct_1();

function __timeout() {
__instance_init__(this, timeout, null, 0, 0, controlsprite, 0, 21);
this.on_creation = function() {
with(this) {
this.set=false;
this.func;
this.time;
this.params;
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(this.set==true){
	if(this.params){
		setTimeout(this.func(this.params),this.time);
	}
	else{
		var me=this;
		setTimeout(function(){me.func();},this.time*1000);
	}
	this.set=false;
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var timeout = new __timeout();

function __next_button() {
__instance_init__(this, next_button, null, 1, 0, next_sprite, 1, 22);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var next_button = new __next_button();

function __real_button() {
__instance_init__(this, real_button, null, 1, -1, real_sprite, 1, 24);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var real_button = new __real_button();

function __read_button() {
__instance_init__(this, read_button, null, 1, 0, read_sprite, 1, 25);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var read_button = new __read_button();

function __backbutton() {
__instance_init__(this, backbutton, null, 1, -5, back_sprite, 1, 26);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var backbutton = new __backbutton();

function __story_menu_code() {
__instance_init__(this, story_menu_code, null, 1, 0, controlsprite, 1, 30);
this.on_creation = on_creation_i;
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(mouse_pressed){
	if(place_meeting(mouse_x,mouse_y,read_button)){
		instance_list(read_button)[0].image_index=1;
	}
	else if(place_meeting(mouse_x,mouse_y,real_button)){
		instance_list(real_button)[0].image_index=1;
	}
	else if(place_meeting(mouse_x,mouse_y,backbutton)){
		instance_list(backbutton)[0].image_index=1;
	}
}

if(mouse_released){
instance_list(read_button)[0].image_index=0;
instance_list(real_button)[0].image_index=0;
instance_list(backbutton)[0].image_index=0;
	if(place_meeting(mouse_x,mouse_y,read_button)){
		window.location.href='noah_story.html';
	}
	else if(place_meeting(mouse_x,mouse_y,real_button)){
		window.location.href='noah_evidence.html';
	}
	else if(place_meeting(mouse_x,mouse_y,backbutton)){
		room_goto(menu);
	}
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var story_menu_code = new __story_menu_code();

function __restartbutton() {
__instance_init__(this, restartbutton, null, 1, -2, restart_sprite, 1, 31);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var restartbutton = new __restartbutton();

function __resumebutton() {
__instance_init__(this, resumebutton, null, 1, -2, resume_sprite, 1, 32);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var resumebutton = new __resumebutton();

function __pausebutton() {
__instance_init__(this, pausebutton, null, 1, -5, pause_sprite, 1, 33);
this.on_creation = function() {
with(this) {
image_speed=0;
}
};
this.on_destroy = on_destroy_i;
this.on_step = on_step_i;
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pausebutton = new __pausebutton();

function __pause_screen_code() {
__instance_init__(this, pause_screen_code, null, 1, 0, controlsprite, 1, 38);
this.on_creation = function() {
with(this) {
gamee.animalsArr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

gamee.hittest=instance_create(0,-2,hittest);


for(var i=0;i<gamee.animalsArr.length;i++){
	var n=instance_create(960-(i*240),425,caught);
	n.image_index=i;
	n.x=Math.random()*room_width;
	n.y=Math.random()*room_height;
	n.xinc=(Math.random()*3)+1;
	n.yinc=(Math.random()*3)+1;
	var pos=Math.round(Math.random());
	var posy=Math.round(Math.random());;
	if(pos==0){
		n.xinc*=-1;
	}
	if(posy==0){
		n.yinc*=-1;
	}
	
}
}
};
this.on_destroy = on_destroy_i;
this.on_step = function() {
with(this) {
if(mouse_pressed){
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,menubutton)){
		instance_list(menubutton)[0].image_index=1;
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,resumebutton)){
		instance_list(resumebutton)[0].image_index=1;
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,restartbutton)){
		instance_list(restartbutton)[0].image_index=1;
	}

}

if(mouse_released){
instance_list(menubutton)[0].image_index=0;
instance_list(resumebutton)[0].image_index=0;
instance_list(restartbutton)[0].image_index=0;
	if(gamee.hittest.place_meeting(mouse_x,mouse_y,menubutton)){
		room_goto(menu);
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,resumebutton)){
		room_goto(continuepen);
	}
	else if(gamee.hittest.place_meeting(mouse_x,mouse_y,restartbutton)){
		room_goto(startpen);
	}

}
var l=instance_list(caught);
for(var i=0;i<l.length;i++){
	l[i].x+=l[i].xinc;
	l[i].y+=l[i].yinc;
	if(l[i].x>960+l[i].sprite_index.width){
		
		l[i].x=0;
		l[i].y=Math.random()*room_height;
		
		
	}
	if(l[i].x+l[i].sprite_index.width<0){
		
		l[i].x=Math.abs(l[i].x)+room_width;
		l[i].y=Math.random()*room_height;
		
	}
	if(l[i].y>640+l[i].sprite_index.height){
		
		l[i].x=Math.random()*room_width;
		l[i].y=0;
		console.log(l[i].y);
	}
	if(l[i].y+(l[i].sprite_index.height/2)<0){
		
		l[i].x=Math.random()*room_width;
		l[i].y=Math.abs(l[i].y)+room_height;
	
	}
	
}
}
};
this.on_end_step = on_end_step_i;
this.on_collision = on_collision_i;
this.on_roomstart = on_roomstart_i;
this.on_roomend = on_roomend_i;
this.on_animationend = on_animationend_i;
this.on_draw = on_draw_i;
}; var pause_screen_code = new __pause_screen_code();



/***********************************************************************
 * SCENES
 ***********************************************************************/
function __menu() { 
this.tiles = [
];
this.objects = [
[{o:title, x:100, y:17}],
[{o:playbutton, x:20, y:480}],
[{o:storybutton, x:600, y:480}]];
this.start = function() {
__room_start__(this, menu, 960, 640, 30, 128, 128, 192, menu_bg.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(-2,-2,menu_code);
};
}
var menu = new __menu();
tu_scenes.push(menu);
function __instructions_1() { 
this.tiles = [
];
this.objects = [
[{o:next_button, x:600, y:440}]];
this.start = function() {
__room_start__(this, instructions_1, 960, 640, 30, 128, 128, 192, pen.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(-2,-2,instructions_1_code);
};
}
var instructions_1 = new __instructions_1();
tu_scenes.push(instructions_1);
function __startpen() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, startpen, 960, 640, 30, 128, 128, 255, pen.image, 0, 0, 0, 960, 640, null, 50, 50);

gamee.hittest=instance_create(0,-2,hittest);
instance_create(-2,-2,startpen_code);
};
}
var startpen = new __startpen();
tu_scenes.push(startpen);
function __continuepen() { 
this.tiles = [
];
this.objects = [
[{o:pausebutton, x:8, y:540}]];
this.start = function() {
__room_start__(this, continuepen, 960, 640, 30, 128, 128, 192, pen.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(0,-2,hittest);
instance_create(-2,-2,continuepen_code);
};
}
var continuepen = new __continuepen();
tu_scenes.push(continuepen);
function __foundmatch() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, foundmatch, 960, 640, 30, 128, 128, 192, null, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(0,-2,foundmatch_code);
setTimeout(function(){room_goto(continuepen);},4000);
};
}
var foundmatch = new __foundmatch();
tu_scenes.push(foundmatch);
function __win() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, win, 960, 640, 30, 128, 128, 192, null, 0, 0, 0, 960, 640, null, 50, 50);
};
}
var win = new __win();
tu_scenes.push(win);
function __lose() { 
this.tiles = [
];
this.objects = [
];
this.start = function() {
__room_start__(this, lose, 960, 640, 30, 0, 0, 0, losebg.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(-2,-2,lose_code)
};
}
var lose = new __lose();
tu_scenes.push(lose);
function __story_menu() { 
this.tiles = [
];
this.objects = [
[{o:read_button, x:481, y:141}],
[{o:real_button, x:480, y:320}],
[{o:backbutton, x:87, y:572}]];
this.start = function() {
__room_start__(this, story_menu, 960, 640, 30, 128, 128, 192, bible.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(-2,-2,story_menu_code);
};
}
var story_menu = new __story_menu();
tu_scenes.push(story_menu);
function __pausescreen() { 
this.tiles = [
];
this.objects = [
[{o:resumebutton, x:488, y:160}],
[{o:restartbutton, x:485, y:340}],
[{o:menubutton, x:332, y:440}]];
this.start = function() {
__room_start__(this, pausescreen, 960, 640, 30, 0, 0, 0, menu_bg.image, 0, 0, 0, 960, 640, null, 50, 50);

instance_create(-2,-2,pause_screen_code);
};
}
var pausescreen = new __pausescreen();
tu_scenes.push(pausescreen);

if(window.location.href.match('=')){
		tu_room_to_go=window[window.location.href.split('=')[1]];
	}
else{
	tu_room_to_go = menu;
}



/***********************************************************************
 * CUSTOM GLOBAL VARIABLES
 ***********************************************************************/
var gamee={};

/***********************************************************************
 * CUSTOM GLOBAL FUNCTIONS
 ***********************************************************************/

function wander(list) { 
var anims=list;

for(var i=0;i<anims.length;i++){

if(anims[i].x-(anims[i].sprite_index.width/2)<0){
anims[i].x=anims[i].sprite_index.width/2;
anims[i].xInc=-anims[i].xInc;
}
else if(anims[i].x+(anims[i].sprite_index.width/2)>room_width){
anims[i].x=room_width-(anims[i].sprite_index.width/2)
anims[i].xInc=-anims[i].xInc;
}

if(anims[i].y-(anims[i].sprite_index.height/2)<0){
anims[i].y=anims[i].sprite_index.height/2;
anims[i].yInc=-anims[i].yInc;
}

else if(anims[i].y+(anims[i].sprite_index.height/2)>room_height-50){
anims[i].y=(room_height-50)-(anims[i].sprite_index.height/2);
anims[i].yInc=-anims[i].yInc;
}

if(anims[i].x<250&&anims[i].y<150){
	if(250-anims[i].x<150-anims[i].y){
		anims[i].x=250;
		anims[i].xInc=-anims[i].xInc;
	}
	else if(150-anims[i].y<250-anims[i].x){
		anims[i].y=150;
		anims[i].yInc=-anims[i].yInc;
	}
	else{
		anims[i].x=250;
		anims[i].xInc=-anims[i].xInc;
		anims[i].y=150;
		anims[i].yInc=-anims[i].yInc;
	}
}
anims[i].x+=anims[i].xInc;
anims[i].y+=anims[i].yInc;

}
}
function captured(list) { 
for(var i=0;i<list.length;i++){
var pair=gamee.hittest.place_meeting(80,80,caught);
if(pair&&pair!=list[i]){
	list[i].move_towards_point(180,80,15);
	if(list[i].x==180&&list[i].y==80&&pair.x==80&&pair.y==80){
		if(pair.image_index==list[i].image_index){
			if(gamee.matchesArr.length>1){
				gamee.lastMatch=gamee.matchesArr[0];
				gamee.matchesArr.splice(0,1);
				
				room_goto(foundmatch);
			}
			
		}
	}
}
else{
	list[i].move_towards_point(80,80,15);
}

}
}
function endIt() { 
var list=instance_list(loose).concat(instance_list(caught));

for(var i=0;i<list.length;i++){

	if(list[i].image_index!=gamee.matchesArr[0]){
		if(list[i].image_alpha-.02>0){
			list[i].image_alpha-=.02;
		}
		else{
			list[i].image_alpha=0;
			if(gamee.endscreen){}
			else {gamee.endscreen=setTimeout(function(){room_goto(lose);},1000);}
		}
	}

}


}


tu_gameloop = tu_loop;
tu_loop();
alert('made it');