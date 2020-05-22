const { succeed, fail, repair, get } = require('./enhancer.js');


describe('enhancer', () => {
    describe('repair function', () => {
        it('restores the durability of the item to 100', () => {
            const item1 = {
                name: 'item1',
                enhancement:20,
                durability: 51
            }

            const item2 = {
                name: 'item2',
                enhancement:15,
                durability:0
            }

            const item3 = {
                name: 'item3',
                enhancement:17,
                durability:100
            }
            
            
            expect(repair(item1).durability).toBe(100);
            expect(repair(item2).durability).toBe(100);
            expect(repair(item3).durability).toBe(100);
        });

        it('should restore the durability when it is null', () => {
            expect(repair({ name: 'item', enhancement: 3}).durability)
            .toBe(100)
            
        })
    });

    describe('succeed function', () => {
        it('achieves enhancement success', () => {
            const item1 = {name: 'item1', enhancement: 0, durability: 11};
            const item2 = {name: 'item2', enhancement: 20, durability: 0};
            expect(succeed(item1)).toEqual({ name: 'item1', enhancement:1, durability:11});
            expect(succeed(item2)).toEqual({ name: 'item2', enhancement: 20, durability: 0});
            
        })
    });

    describe('fail function', () => {
        it('achieves enhancement failure', () => {
            const item1 = {name: 'item1', enhancement: 0, durability: 11};
            const item2 = {name: 'item2', enhancement: 15, durability: 59};
            const item3 = {name: 'item3', enhancement: 20, durability: 80};
            expect(fail(item1)).toEqual({name: 'item1', enhancement: 0, durability: 6});
            expect(fail(item2)).toEqual({name: 'item2', enhancement: 15, durability: 49});
            expect(fail(item3)).toEqual({name: 'item3', enhancement: 20, durability: 79})
        });

        it('if given an item with a durability of 0 or a negative durability, it should return an item with durability value 0', () => {
            const item1 = { name: 'item1', enhancement: 72, durability: 0};
            const item2 = { name: 'item2', enhancement: 72, durability: -10};
            expect(fail(item1)).toEqual({ name: 'item1', enhancement: 72, durability: 0});
            expect(fail(item2)).toEqual({ name: 'item2', enhancement: 72, durability: 0});
        })
    });

    it('should return an item with durability value of 0, if no durability is provided, or the durability is not an integer type in the input item object', () => {
        const input1 = {name : 'item', enhancement: 99};
        const expected1 = {name : 'item', enhancement: 99, durability: 0};

        const input2 = {name : 'item', enhancement: 99, durability: 'string'};
        const expected2 = {name : 'item', enhancement: 99, durability: 0};
        expect(fail(input1)).toEqual(expected1);
        expect(fail(input2)).toEqual(expected2);
    })
           
});



