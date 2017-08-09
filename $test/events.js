import test from 'ava';

import On from '../$build/events/on';

test('On class behaves expectedly', async t => {
    On.do(function() {
        t.pass();
    });
    await On.trigger();
});