const namespaces = Object.values(ABLincoln.running_tests).map(rt => rt.namespace);

const choicesByNamespace = namespaces.reduce((nsChoices, ns) => {
    const { name, experiments } = ns;
    const experimentParameters = experiments.map(e => e.parameters);
    const allParametersForNamespace = [].concat(...experimentParameters);
    nsChoices[name] = allParametersForNamespace.reduce((choices, param) => {
      const { name, choice } = param;
      choices[name] = choices[name] || [];
      if (!choices[name].includes(choice)) {
        choices[name].push(choice);
      }
      return choices;
    }, {});

    return nsChoices;
}, {});

const makeSelectForChoices = (choicesByNamespace) => {
  const select = document.createElement('select');

  Object
    .keys(choicesByNamespace)
    .forEach((namespaceName) => {
      const namespaceChoices = choicesByNamespace[namespaceName];
      const optionGroup = document.createElement('optgroup');
      optionGroup.setAttribute('label', namespaceName);

      // go through all parameters and choice to make options
      Object
        .keys(namespaceChoices)
        .forEach(parameterName => {
          namespaceChoices[parameterName]
            .forEach(choice => {
              const option = document.createElement('option');
              option.value = `?ab_${parameterName}=${choice}`;
              option.innerHTML = `${parameterName}: ${choice}`;
              optionGroup.appendChild(option);
            });
        });
      select.appendChild(optionGroup);

      select.addEventListener('change', (evt) => {
        document.location.search = select.value;
      });
    });
  return select;
};

const init = () => {
  const select = makeSelectForChoices(choicesByNamespace);
  document.body.firstElementChild.style.opacity = 0.3;
  select.style.cssText = 'position: fixed; top: 10%; left: 50%;';
  document.body.appendChild(select);
};

init();
