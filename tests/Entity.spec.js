import chai, { expect } from 'chai';
import Entity from '../src/Entity';

chai.config.includeStack = true;

describe('Entity', () => {
  it('should be a function', () => {
    expect(Entity).to.be.a('function');
  });

  describe('#squarePoints', () => {
    it('should be correctly calculated', () => {
      const entity = new Entity({
        size: { x: 100, y: 10 },
        position: { x: 0, y: 0 },
        angle: 0,
      });
      const points = entity.squarePoints;
      points.forEach((p) => {
        p.x = Math.round(p.x);
        p.y = Math.round(p.y);
      });
      expect(points).to.deep.equal([
        { x: 50, y: -5 },
        { x: 50, y: 5 },
        { x: -50, y: 5 },
        { x: -50, y: -5 },
      ]);
    });

    it('should be correctly calculated with a 180 degrees angle', () => {
      const entity = new Entity({
        size: { x: 100, y: 10 },
        position: { x: 0, y: 0 },
        angle: Math.PI,
      });
      const points = entity.squarePoints;
      points.forEach((p) => {
        p.x = Math.round(p.x);
        p.y = Math.round(p.y);
      });
      expect(points).to.deep.equal([
        { x: -50, y: 5 },
        { x: -50, y: -5 },
        { x: 50, y: -5 },
        { x: 50, y: 5 },
      ]);
    });
  });
});
