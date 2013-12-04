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
        self.assertEqual(json.loads(response.data), {'status': 'success'})

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

    def test_status(self):
        response = self.client.get('/status')
        response_json = json.loads(response.data)
        self.assertEqual(set(response_json), {u'playlist', u'volume', u'state', u'status',
                                              u'mixrampdb', u'repeat', u'consume', u'random', u'xfade', u'playlistlength', u'single',
                                              u'mixrampdelay'})

    def test_stats(self):
        response = self.client.get('/stats')
        response_json = json.loads(response.data)
        self.assertIn('status', response_json)

    def empty_json_dict(self, d):
        self.assertEqual(d, {})

    def test_previous(self):
        self.client.get('/previous')

    def test_cover(self):
        response = self.client.get('/cover')
        response_json = json.loads(response.data)
        response_key = response_json.keys()
        self.assertIn('small', response_key)
        self.assertIn('extralarge', response_key)
        self.assertIn('large', response_key)
        self.assertIn('mega', response_key)
        self.assertIn('medium', response_key)
        self.assertIn('success', response_key)

if __name__ == '__main__':
    unittest.main()
