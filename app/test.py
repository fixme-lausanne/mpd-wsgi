#!/usr/bin/env python2
import json
import app
import unittest

class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.app.config['TESTING'] = True
        self.client = app.app.test_client()

    def test_play(self):
        self.client.get('/')

    def test_current(self):
        response = self.client.get('/current')
        json_resp = json.loads(response.data)
        self.assertIn("status", json_resp.keys())

    def test_action(self):
        response = self.client.get('/action/next')
        self.assertEqual(json.loads(response.data), {'status': 'success'})
        response = self.client.get('/action/previous')
        self.assertEqual(json.loads(response.data), {'status': 'success'})

    def test_toggle(self):
        def get_state():
            response = self.client.get('/status')
            return json.loads(response.data)['state']

        self.client.get("/action/play")
        self.assertEqual(get_state(), 'play')
        self.client.get("/action/play_pause")
        self.assertEqual(get_state(), 'pause')
        self.client.get("/action/play_pause")
        self.assertEqual(get_state(), 'play')

    def test_stat(self):
        response = self.client.get('/status')
        response_json = json.loads(response.data)
        key_set = {u'nextsong', u'mixrampdb', u'repeat', u'consume', u'xfade', u'song', u'volume', u'random', u'songid', u'elapsed', u'playlist', u'playlistlength', u'single', u'mixrampdelay', u'status', u'state', u'time', u'audio', u'bitrate', u'nextsongid'}
        self.assertEqual(set(response_json.keys()), key_set)

    def test_previous(self):
        old_song = json.loads(self.client.get('/current').data)
        ret = self.client.get('/action/next')
        self.assertEqual(ret.status_code, 200)
        ret = self.client.get('/action/previous')
        self.assertEqual(ret.status_code, 200)
        current_song = json.loads(self.client.get('/current').data)
        self.assertEqual(current_song, old_song)


    def test_search(self):
        ret = self.client.get('/search')
        self.assertEqual(ret.status_code, 400)
        for i in ['album', 'artist', 'title', 'any']:
            ret = self.client.get('/search?{}='.format(i))
            self.assertEqual(ret.status_code, 200)


if __name__ == '__main__':
    unittest.main()
