# How to run:

### development mode

Just run `yarn start`

Make sure that you environment is using the latest typescript version, otherwise, it will throw some type errors

### Test mode

on `yarn test` you can see e2e test mande on `Main` container, I've added some tests to coverage the main user actions on the app

# To do:

- [ ] Add unit test
- [ ] increase test coverage
- [ ] Make layout more responsive
- [ ] Implement optional feature
- [ ] Style some unstyled component such as inputs inside form
- [ ] Use scss `mixins` to make `Button` css more organized
- [ ] Input mask and strong validation

# Decisions

Some explanations of technical decisions I made:

- I preferred to use something simpler to manage the state, so I used [react Context](https://reactjs.org/docs/context.html) something I dont use so much
- I preferred to use libs for more complex things that are likely to fall outside the scope of the test, such as a lib to manage the form, on the other hand, I created simpler things, such as the `Modal` component
