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
        self.assertEqual(json.loads(response.data), {})

    def test_action(self):
        response = self.client.get('/action/next')
        self.assertEqual(json.loads(response.data), {})
        response = self.client.get('/action/previous')
        self.assertEqual(json.loads(response.data), {})

    def test_stat(self):
        response = self.client.get('/status')
        response_json = json.loads(response.data)
        self.assertEqual(set(response_json), {u'playlist', u'volume', u'state',
        u'mixrampdb', u'repeat', u'consume', u'random', u'xfade', u'playlistlength', u'single',
        u'mixrampdelay'})

    def empty_json_dict(self, d):
        self.assertEqual(d, {})

    def test_previous(self):
        self.client.get('/previous')


if __name__ == '__main__':
    unittest.main()
