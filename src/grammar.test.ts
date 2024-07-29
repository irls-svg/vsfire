import { findType, accessModifiers } from './grammar';
import { expect } from 'chai';
import { test } from 'mocha';

test('finds named TypeInfo', () => {
   ['math', 'global'].forEach(async name => {
      const info = await findType(name);
      expect(info).to.exist;
      expect(info).to.have.property('methods');
   });
});

test('supports full and relative type paths', async () => {
   const t1 = await findType('token');
   const t2 = await findType('request.auth.token');

   expect(t1).to.exist;
   expect(t1).to.have.property('fields');
   expect(t1!.fields).to.have.property('phone_number');

   expect(t2).to.exist;
   expect(t1).to.deep.equal(t2);
});

test('applies basic type members to implementations', async () => {
   const info = await findType('request.time');

   expect(info).to.exist;
   expect(info).to.have.property('methods');
   expect(info!.methods!['year']).to.have.property(
      'about',
      'The year value as an `int`, from 1 to 9999.'
   );
});

test('generates snippets for parameterized methods', async () => {
   const info = await findType('request.path');

   expect(info).to.exist;
   expect(info).to.have.property('methods');
   expect(info!.methods!['split']).to.have.property(
      'snippet',
      'split(${1:regex})$0'
   );
   expect(info!.methods!['size']).to.have.property('snippet', 'size()$0');
});

test('builds list of request access methods', async () => {
   const methods = await accessModifiers();

   expect(methods).to.exist;
   expect(methods).to.have.lengthOf(7);
});
