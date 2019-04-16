let chai = require('chai'),
supertest = require('supertest'),
mocha = require('mocha'),
app = require('../bin/www'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
config = require(__root + 'config'),
expect = chai.expect,
controller = require(__root + 'module/auth/authController');

var server = supertest.agent('http://localhost:' + config.port + '/api');
var userdata;

describe('Auth Module test', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });

        userdata = new User({
            name: 'testuser',
            email: 'mail@testuser.com',
            password: 'password'
        });
        
        let req = {body: userdata};
        controller.RegisterUser(req);
        
    });
    
    it('it should register new user', (done) => {
        let registerUser = {
            name: 'testuserregister',
            email: 'mail@testuserregister.com',
            password: 'password'
        };

        server.post('/auth/register')
        .send(registerUser)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('auth').that.equal(true);
            expect(res.body).to.have.a.property('token');
            done();
        });
    });

    it('it should get the user token', (done) => {            
        server.post('/auth/login')
        .send(userdata)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('auth').that.equal(true);
            expect(res.body).to.have.a.property('token');
            done();
        });
    });

    it('it should loged out the user', (done) => {            
        server.post('/auth/logout')
        .send(userdata)
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('auth').that.equal(false);
            expect(res.body).to.have.a.property('token').that.equal(null);
            done();
        });
    });

    // afterEach((done) => {
    //     User.remove().exec(function(){
    //         done();  
    //       });
    //   });
});